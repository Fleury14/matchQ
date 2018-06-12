import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { ITournament } from '../../interfaces/tournament';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material';
import { DeleteModal } from './delete-modal/delete-modal';
import { take } from 'rxjs/operators';
import { SearchModal } from './search-modal/search-modal';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

    
    public myTournaments:ITournament[];
    private _tournSub: Subscription;
    public searchInput:string;

    constructor(private _tourn:TournamentService, private _matDialog: MatDialog, private _sub: SubscriptionService) {}
    
    ngAfterViewInit(): void {
        // console.log('grabbing list');
        this._tournSub = this._tourn.getMyTournament(localStorage.getItem('uid')).subscribe((response) => {
            this.myTournaments = response['result'];
            // console.log(this.myTournaments);
        });

    }

    ngOnInit(): void {

       
        const cards = document.getElementsByClassName('card');
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.remove('owned-fade');
            cards[i].classList.remove('sub-fade');    
        }
    }

    public openDelete() {
        const deleteMod = this._matDialog.open(DeleteModal, {
            data: {
                list: this.myTournaments
            }
        });

        deleteMod.afterClosed().subscribe( (tourn:ITournament) => {
            if(tourn) {
                console.log('Deleting result', tourn);
                this._delete(tourn.name);
            }            
        })
    }

    public search() {
        this._tourn.searchTournament(this.searchInput).pipe(
            take(1)
        ).subscribe( searchResult => {
            console.log('search result:', searchResult);
            let searchMod;
            if(searchResult['result'] && searchResult['result'].length > 0) {
                searchMod = this._matDialog.open(SearchModal, {
                    data: { list: searchResult['result'] },
                    width: '400px'
                })
            }

            searchMod.afterClosed().subscribe( (tourn:ITournament) => {
                this._refresh();
            } );
            
        })
    }

    private _refresh() {
        // console.log('executing refresh');
        this._tournSub.unsubscribe();
        this._tournSub = this._tourn.getMyTournament(localStorage.getItem('uid')).subscribe((response) => {
            // console.log('reassigning the following', response);
            this.myTournaments = response['result'];
            // console.log(this.myTournaments);
        });
    }

    private _delete(name:string) {
        this._tourn.deleteTournament(name).subscribe(result => {
            console.log('result from delete:', result);
            this._refresh();
        });
    }

}