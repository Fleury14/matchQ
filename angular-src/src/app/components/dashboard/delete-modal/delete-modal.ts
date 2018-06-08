import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-delete-modal',
    templateUrl: './delete-modal.html',
    styleUrls: [ './delete-modal.scss' ]
})

export class DeleteModal {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any ) {}
}