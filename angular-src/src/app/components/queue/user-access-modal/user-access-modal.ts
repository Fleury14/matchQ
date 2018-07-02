import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTable, MatSnackBar } from '@angular/material';
import { UserService } from '../../../services/user.service';
import { ITournament } from '../../../interfaces/tournament';
import { take } from 'rxjs/operators';
import { IUser } from '../../../interfaces/user';
import { QueueService } from '../../../services/queue.service';
import { QueueSnackBarComponent } from '../queue-snack-bar/queue-snack-bar';

@Component({
    selector: 'app-user-access-modal',
    templateUrl: './user-access-modal.html',
    styleUrls: [ './user-access-modal.scss' ]
})

export class UserAccessModal implements OnInit {
    
    public currentTourn: ITournament;
    public usersWithAccess: IUser[];
    public columnsToDisplay = ['displayName', 'email', 'access'];
    @ViewChild(MatTable) private accessTable:MatTable<any>

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _user: UserService, private _dialogRef:MatDialogRef<UserAccessModal>, private _queue: QueueService, private _snackBar: MatSnackBar ) {
        console.log('modal data', data);
        this.currentTourn = data;
    }

    ngOnInit(): void {
        this.usersWithAccess = [];
        if (this.currentTourn.access.length > 0) {
            // loop over access array
            this.currentTourn.access.forEach( (uid) => {
                // get user information for each uid
                this._user.check(uid).pipe( take(1) ).subscribe(response => {
                    // push info into an array
                    if (response['user']) { this.usersWithAccess.push(response['user']); }
                    console.log('list of users with access:', this.usersWithAccess);
                    this.accessTable.renderRows();
                })
            })
        } 
        // that array is what we will ngfor
    }

    public remove(uid:string) {
        this._queue.removeAccess(uid, this.currentTourn._id).pipe( take(1) ).subscribe(response => {
            console.log('Response from removing access');
            this._dialogRef.close();
            this._snackBar.openFromComponent(QueueSnackBarComponent, {
                data: {
                    message: 'Access removed'
                },
                duration: 2000
            });
        })
    }
}