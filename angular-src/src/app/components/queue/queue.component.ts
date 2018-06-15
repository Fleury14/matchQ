import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, take } from 'rxjs/operators';
import { ITournament } from '../../interfaces/tournament';
import { QueueService } from '../../services/queue.service';
import { SubscriptionService } from '../../services/subscription.service';
import { NavInfoService } from '../../services/nav-info.servce';

@Component({
    selector: 'app-queue',
    templateUrl: './queue.component.html',
    styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
    
    public currentTourn:ITournament;
    public isSubscribed:boolean;

    constructor(private _tourn: TournamentService, private _route: ActivatedRoute, private _queue: QueueService, private _sub: SubscriptionService,
        private _navInfo: NavInfoService) {}

    ngOnInit(): void {
        this._getTourn().subscribe( (tournResponse) => {
            if (tournResponse['result']) {
                this.currentTourn = tournResponse['result'][0];
                console.log('current tournament:', this.currentTourn);
                this.isSubscribed = this.currentTourn.subscribers.includes( localStorage.getItem('uid') );
    
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
    }

}