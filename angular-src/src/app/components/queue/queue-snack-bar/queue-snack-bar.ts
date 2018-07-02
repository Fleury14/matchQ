import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
    selector: 'app-queue-snack-bar',
    templateUrl: './queue-snack-bar.html',
    styleUrls: [ './queue-snack-bar.scss']
})

export class QueueSnackBarComponent {
    public snackMessage = 'I am a message'

    constructor( @Inject(MAT_SNACK_BAR_DATA) public data: any) {
        this.snackMessage = data.message;
    }
}