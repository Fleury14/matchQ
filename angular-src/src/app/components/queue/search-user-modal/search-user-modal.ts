import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IUser } from '../../../interfaces/user';
import { InviteService } from '../../../services/invite.service';

@Component({
    selector: 'app-search-user-modal',
    templateUrl: './search-user-modal.html',
    styleUrls: [ './search-user-modal.scss' ]
})

export class SearchUserModal {

    public columnsToDisplay = ['displayName', 'email', 'subbed', 'access', 'invite'];
    public toast: string;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _invite: InviteService, private _dialogRef:MatDialogRef<SearchUserModal> ) {
        console.log('modal data', data);
    }

    public isSubbed(user: IUser) {
        return this.data.tourn.subscribers.includes(user.uid);
    }

    public access(uid:string, invites:any[]):any {
        // 0: no access 1: subbed  3: accepted 4: owner
        console.log('calling access', uid, invites);
        if (this.data.tourn.belongsTo === uid) {
            console.log('returning 4');
            return {code: 4, title: 'Owner'};
        }

        console.log(invites);

        if (this.data.tourn.access.includes(uid)) { return {code: 3, title: 'Read/Write'}; }
        // console.log('list', this.data.list);
        if (invites && invites.filter(invite => invite.tournId === this.data.tourn._id).length > 0 ) { return {code: 2, title: 'Invited'}; }

        if (this.data.tourn.subscribers.includes(uid)) { return {code: 1, title: 'Subscribed'}; }

        if (this.data.tourn.belongsTo !== uid && !this.data.tourn.access.includes(uid) && !this.data.tourn.subscribers.includes(uid)) { return {code: 0, title: 'Read Only'}; }
    }

    public add(uid:string) {
        this._invite.add(uid, this.data.tourn._id, this.data.tourn.name).subscribe(resp => {
            this.toast = resp['message'];
            setTimeout(this._dialogRef.close(), 1000);
        })
    }

    public remove(uid:string) {
        this._invite.remove(uid, this.data.tourn._id).subscribe(resp => {
            this.toast = resp['message'];
            setTimeout(this._dialogRef.close(), 1000);
        })
    }
}