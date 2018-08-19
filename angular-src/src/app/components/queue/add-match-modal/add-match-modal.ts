import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IUser } from '../../../interfaces/user';
import { InviteService } from '../../../services/invite.service';
import { NgForm } from '@angular/forms';
import { QueueService } from '../../../services/queue.service';
import { IMatch } from '../../../interfaces/match';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-add-match-modal',
    templateUrl: './add-match-modal.html',
    styleUrls: [ './add-match-modal.scss' ]
})

export class AddMatchModal {

    public toast: string;
    public player1Name: string;
    public player2Name: string;
    @ViewChild('addMatchForm') addMatchForm: NgForm;
    private _data: any;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _dialogRef:MatDialogRef<AddMatchModal>, private _queue: QueueService ) {
        console.log('modal data', data);
        this._data = data;
    }

    addMatch() {
        const formValue = this.addMatchForm.value;
        console.log(formValue);
        const newMatch:IMatch = {
            player1: formValue.player1Name,
            player2: formValue.player2Name,
            order: this._data['order'],
            finished: false,
            finished_at: null
        };
        this._queue.addMatch(this._data['tournId'], this._data['uid'], newMatch).pipe( take(1) ).subscribe(resp => this._dialogRef.close()) ;

    }
}