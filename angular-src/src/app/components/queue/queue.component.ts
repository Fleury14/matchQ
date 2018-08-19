import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, take } from 'rxjs/operators';
import { ITournament } from '../../interfaces/tournament';
import { QueueService } from '../../services/queue.service';
import { SubscriptionService } from '../../services/subscription.service';
import { NavInfoService } from '../../services/nav-info.servce';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material';
import { SearchUserModal } from './search-user-modal/search-user-modal';
import { AddMatchModal } from './add-match-modal/add-match-modal';
import { IUser } from '../../interfaces/user';
import { UserAccessModal } from './user-access-modal/user-access-modal';
import { Subscription } from 'rxjs';
import { IMatch } from '../../interfaces/match';


@Component({
    selector: 'app-queue',
    templateUrl: './queue.component.html',
    styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
    
    public currentTourn:ITournament;
    public isSubscribed:boolean;
    public searchVal: string;
    private _tournSub: Subscription;
    public matchList: IMatch[];

    constructor(private _tourn: TournamentService, private _route: ActivatedRoute, private _queue: QueueService, private _sub: SubscriptionService,
        private _navInfo: NavInfoService, private _user: UserService, private _matDialog: MatDialog) {}

    ngOnInit(): void {
        this._refreshTournInfo();
    }

    private _getMatches(): void {
        this._queue.getMatches(this.currentTourn._id).subscribe(resp => {
            console.log('List of matches:', resp);
            this.matchList = resp['result'];
        })
    }

    private _refreshTournInfo() {
        if(this._tournSub) {
            this._tournSub.unsubscribe()
        }

        this._tournSub = this._getTourn().subscribe( (tournResponse) => {
            if (tournResponse['result']) {
                this.currentTourn = tournResponse['result'][0];
                console.log('current tournament:', this.currentTourn);
                this.isSubscribed = this.currentTourn.subscribers.includes( localStorage.getItem('uid') );
                // TODO FLATTEN OUT SUBSCRIBE
                this._getMatches();
            }
        })
    }

    private _getTourn() {
        return this._route.paramMap.pipe(
            mergeMap( paramResponse => this._tourn.getTournByName(paramResponse.get('id'))) 
        )
    }

    public toggle() {
        this._queue.toggleActive(this.currentTourn.name).subscribe(resp => {
            this.currentTourn.active = resp['result'];
            // be sure to update the nav bar info when changing activity
            this._navInfo.updateNav();
        });
    }

    public toggleSub() {
        if(this.isSubscribed) {
            this._sub.delete(this.currentTourn, localStorage.getItem('uid')).pipe( take(1) ).subscribe( resp => {
                this.currentTourn.subscribers.splice(this.currentTourn.subscribers.indexOf(localStorage.getItem('uid')), 1)
            });
        } else {
            this._sub.add(this.currentTourn, localStorage.getItem('uid')).pipe( take(1) ).subscribe( resp => {
                this.currentTourn.subscribers.push(localStorage.getItem('uid'));
            });
        }

        this.isSubscribed = !this.isSubscribed;
        
    }

    public toggleUserSearch() {
        document.querySelector('.user-search').classList.toggle('hide-search');
        document.querySelector('.search-button').classList.toggle('hide-search-button');
    }

    public async userSearch() {
        this._user.search(this.searchVal).pipe( take(1) ).subscribe( searchResult => {
            console.log('user search result', searchResult);
            const searchMod = this._matDialog.open(SearchUserModal, {
                data: { list : searchResult['result'], tourn: this.currentTourn }
            })

            searchMod.afterClosed().subscribe(resp => {
                console.log('modal closed:', resp);
                // TODO: REFRESH TOURNEY INFO
            })
        } );
        
    }

    public access(uid:string):number {
        // 0: no access 1: subbed  3: accepted 4: owner
        if (this.currentTourn.belongsTo === uid) {
            return 4;
        }

        if (this.currentTourn.access.includes(uid)) { return 3; }

        if (this.currentTourn.subscribers.includes(uid)) { return 1; }

        if (this.currentTourn.belongsTo !== uid && !this.currentTourn.access.includes(uid) && !this.currentTourn.subscribers.includes(uid)) { return 0; }
    }

    public currentAccessString() {
        if (!this.currentTourn) {
            return '';
        }
        switch (this.access(localStorage.getItem('uid'))) {
            case 4:
                return 'Owner';
            case 3:
                return 'Read/Write';
            case 1:
                return 'Subscribed';
            default:
                return 'Read Only';
        }
    }

    public userHasInvite(user:IUser) {
        const result = user.invites.filter( (invite) => invite.tournId == this.currentTourn._id);
        if (result) { return true } else { return false }
    }

    public userAccessList() {
        const accessList = this._matDialog.open(UserAccessModal, {
            data: this.currentTourn,
        }).afterClosed().pipe( take(1) ).subscribe( resp => {
            this._refreshTournInfo();
        })
    }

    public addMatch() {
        this._matDialog.open(AddMatchModal, {data: {
            order: this.currentTourn.matches.length + 1,
            tournId: this.currentTourn._id,
            uid: localStorage.getItem('uid')
        }});
    }

}