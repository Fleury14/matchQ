import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IUser } from '../../../interfaces/user';
import { InviteService } from '../../../services/invite.service';
import { NgForm } from '@angular/forms';

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

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _dialogRef:MatDialogRef<AddMatchModal> ) {
        console.log('modal data', data);
    }

    addMatch() {
        console.log(this.addMatchForm);
    }
}