import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()

export class LoginRouterGuard implements CanActivate {

    constructor (private _login: LoginService, private _router:Router) {}

    canActivate(): Observable<boolean> {
        return this._login.getLoggedInInfo().pipe(
            map( authState => {
                if (!authState) {
                    this._router.navigateByUrl('/');
                }
                 return Boolean(authState) 
                } )
        );
    }
}