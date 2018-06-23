import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../interfaces/user';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-invites',
    templateUrl: './invite.component.html',
    styleUrls: [ './invite.component.scss' ]
})

export class InviteComponent implements OnInit {
   
    public user: IUser;
    public invalidParam:boolean = false;

    constructor (private _route: ActivatedRoute, private _user: UserService) {}

    ngOnInit(): void {
        this._route.paramMap.pipe(
            map(paramResponse => paramResponse.get('id')),
            switchMap( (user:string) => {
                if (user) {
                    return this._user.check(user);
                } else {
                    console.log('No parameter supplied!')
                }
            })
        ).subscribe(response => {
            if(response && response['user']) {
                this.user = response['user'];
                console.log('current user', this.user)
            } else {
                this.invalidParam = true;
            }
        })
    }
}