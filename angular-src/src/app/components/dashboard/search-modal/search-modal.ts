import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SubscriptionService } from '../../../services/subscription.service';
import { ITournament } from '../../../interfaces/tournament';

@Component({
    selector: 'app-search-modal',
    templateUrl: './search-modal.html',
    styleUrls: [ './search-modal.scss' ]
})

export class SearchModal implements OnInit {

    public uid:string = localStorage.getItem('uid');
    public searchMessage:string = ' ';

    ngOnInit(): void {
    }
    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _dialogRef:MatDialogRef<SearchModal>, private _sub: SubscriptionService ) {}

    public async sub(tourn:ITournament) {
        console.log('tourn:', tourn);
        await this._sub.add(tourn, localStorage.getItem('uid')).subscribe( (response) => {
            console.log(response);
            if (response.message && response.message.includes('Subscriber')) {
                this.searchMessage = 'Subscription successfully added';
                setTimeout(() => {
                    this._dialogRef.close();
                }, 2000)
            } else {
                this.searchMessage = 'There was an error while adding';
            }
        });
    }

    public async unsub(tourn:ITournament) {
        await this._sub.delete(tourn, localStorage.getItem('uid')).subscribe( (response) => {
            console.log(response);
            if (response.message && response.message.includes('Subscriber')) {
                this.searchMessage = 'Subscription successfully removed';
                setTimeout(() => {
                    this._dialogRef.close();
                }, 2000)
            } else {
                this.searchMessage = 'There was an error while unsubscribing';
            }
        } );
    }
}