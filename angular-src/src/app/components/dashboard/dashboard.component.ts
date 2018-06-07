import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { ITournament } from '../../interfaces/tournament';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    public myTournaments:ITournament[];
    private _tournSub: Subscription;

    constructor(private _tourn:TournamentService) {}
    
    ngOnInit(): void {

        this._tournSub = this._tourn.getMyTournament(localStorage.getItem('uid')).subscribe((response) => {
            this.myTournaments = response['result'];
            console.log(this.myTournaments);
        });

        const cards = document.getElementsByClassName('card');
        for (let i = 0; i < cards.length; i++) {
            cards[i].classList.remove('owned-fade');
            cards[i].classList.remove('sub-fade');    
        }
    }

}