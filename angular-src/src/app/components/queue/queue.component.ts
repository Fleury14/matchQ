import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../../services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { ITournament } from '../../interfaces/tournament';
import { QueueService } from '../../services/queue.service';

@Component({
    selector: 'app-queue',
    templateUrl: './queue.component.html',
    styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {
    
    public currentTourn:ITournament;

    constructor(private _tourn: TournamentService, private _route: ActivatedRoute, private _queue: QueueService) {}

    ngOnInit(): void {
        this._getTourn().subscribe( (tournResponse) => {
            if (tournResponse['result']) {
                this.currentTourn = tournResponse['result'][0];
                console.log('current tournament:', this.currentTourn);
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
        });
    }

}