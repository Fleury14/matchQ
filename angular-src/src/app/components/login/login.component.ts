import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
})

export class LoginComponent implements OnInit, OnDestroy {

    private _infoSub: Subscription

    ngOnDestroy(): void {
        this._infoSub.unsubscribe;
    }
    ngOnInit(): void {
        this._infoSub = this._login.getLoggedInInfo().subscribe( (result) => {
            // console.log(result);
            if(result) {
                this._router.navigateByUrl('dashboard');
            }
        })
    }
    constructor (private _login:LoginService, private _router: Router) {}

    public login() {
        this._login.login().then( (result) => {
            console.log('result', result.credential.idToken);
            if( result.credential.idToken) {
                localStorage.setItem('displayName', result.user.displayName);
                localStorage.setItem('email', result.user.email);
                localStorage.setItem('uid', result.user.uid);
                this._router.navigateByUrl('dashboard');
            }
            this._login.getToken().then( (token) => {
                localStorage.setItem('idToken', token);
            })
        } )
    }

    public logout() {
        this._login.logout();
    }

}