import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../interfaces/user';
import { map, switchMap, take } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { InviteService } from '../../services/invite.service';
import { NavInfoService } from '../../services/nav-info.servce';

@Component({
    selector: 'app-invites',
    templateUrl: './invite.component.html',
    styleUrls: [ './invite.component.scss' ]
})

export class InviteComponent implements OnInit {
   
    public user: IUser;
    public invalidParam:boolean = false;

    constructor (private _route: ActivatedRoute, private _user: UserService, private _invite: InviteService, private _navInfo: NavInfoService) {}

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

    public accept(tournId: string, tournName: string) {
        this._invite.accept(this.user.uid, tournId, tournName).pipe( take(1) ).subscribe( response => {
            console.log('response from server,', response);
            this.user.invites = this.user.invites.filter(invite => invite.tournId !== tournId);
            this._navInfo.updateNav();
        })
    }

    public decline(tournId:string) {
        console.log('uid', this.user.uid, 'tournid', tournId);
        this._invite.remove(this.user.uid, tournId).pipe( take(1) ).subscribe( response => {
            console.log('response from server:', response);
            this.user.invites = this.user.invites.filter(invite => invite.tournId !== tournId);
            this._navInfo.updateNav();
        } )
    }
}