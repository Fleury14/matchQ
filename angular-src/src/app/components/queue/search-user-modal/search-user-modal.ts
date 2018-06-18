import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { IUser } from '../../../interfaces/user';

@Component({
    selector: 'app-search-user-modal',
    templateUrl: './search-user-modal.html',
    styleUrls: [ './search-user-modal.scss' ]
})

export class SearchUserModal {

    public columnsToDisplay = ['displayName', 'email', 'subbed'];

    constructor(@Inject(MAT_DIALOG_DATA) public data: any ) {
        console.log('modal data', data);
    }

    public isSubbed(user: IUser) {
        return this.data.tourn.subscribers.includes(user.uid);
    }
}