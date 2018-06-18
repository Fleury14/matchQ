import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { IUser } from '../../../interfaces/user';

@Component({
    selector: 'app-search-user-modal',
    templateUrl: './search-user-modal.html',
    styleUrls: [ './search-user-modal.scss' ]
})

export class SearchUserModal {

    public columnsToDisplay = ['displayName', 'email', 'subbed', 'access', 'invite'];

    constructor(@Inject(MAT_DIALOG_DATA) public data: any ) {
        console.log('modal data', data);
    }

    public isSubbed(user: IUser) {
        return this.data.tourn.subscribers.includes(user.uid);
    }

    public access(uid:string):any {
        // 0: no access 1: subbed  3: accepted 4: owner
        if (this.data.tourn.belongsTo === uid) {
            return {code: 4, title: 'Owner'};
        }

        if (this.data.tourn.access.includes(uid)) { return {code: 3, title: 'Read/Write'}; }

        if (this.data.tourn.subscribers.includes(uid)) { return {code: 1, title: 'Subscribed'}; }

        if (this.data.tourn.belongsTo !== uid && !this.data.tourn.access.includes(uid) && !this.data.tourn.subscribers.includes(uid)) { return {code: 0, title: 'Read Only'}; }
    }
}