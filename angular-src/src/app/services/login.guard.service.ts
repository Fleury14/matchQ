import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable()

export class LoginRouterGuard implements CanActivate {

    
    private _checkSub: Subscription;
    private _addSub: Subscription;

    constructor (private _login: LoginService, private _router:Router, private _user:UserService) {}

    canActivate(): Observable<boolean> {
        return this._login.getLoggedInInfo().pipe(
            map( authState => {
                if (!authState) {
                    this._router.navigateByUrl('/');
                }

                if(authState) {
                    // console.log('checking if user is in db...', authState);
                    this._checkSub = this._user.check(authState.uid).pipe( take(1) ).subscribe( (resp) => {
                        // console.log(resp['result']);
                        const answer = resp['result'];
                        if (!answer) {
                            console.log('adding user...');
                            this._addSub = this._user.add(authState.displayName, authState.email, authState.uid).pipe( take(1) ).subscribe( (resp) => { console.log(resp) });
                        }
                    })
                }
                 return Boolean(authState) 
                } )
        );
    }
}