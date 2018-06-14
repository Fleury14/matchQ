import { Component } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-tourn-create',
    templateUrl: './tournament-create.component.html',
    styleUrls: [ './tournament-create.component.scss' ]
})

export class TournamentCreateComponent {
    public tournamentName: string;
    public submitMessage: string;

    constructor(public _tourn:TournamentService, private _router:Router) {}

    create() {
        if(!this.tournamentName) {
            alert('You need to enter a name');
        }

        this.submitMessage = 'Submitting...';

        // TODO: Name validation
        this._tourn.createTournament(this.tournamentName).subscribe( (response) => {
            console.log('Response from creating tournament', response);
            this.submitMessage = response['message'];
            if (this.submitMessage.includes('Success')) {
                this.submitMessage.concat(', returning to dashboard...')
            }
            setTimeout( () => {
                this._router.navigateByUrl('dashboard');
            }, 2000 )
        })
    }
}