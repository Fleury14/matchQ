import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase';

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
            // console.log('login check', result);
            if(result && localStorage.getItem('idToken')) {
                this._login.sendInfo();
                // console.log('kicking to dashboard');
                this._router.navigateByUrl('dashboard');
            }
        })
    }
    constructor (private _login:LoginService, private _router: Router) {}

    public login() {
        this._login.login().then( (result) => {
            // console.log('result', result);
            if( result.credential['idToken']) {
                localStorage.setItem('displayName', result.user.displayName);
                localStorage.setItem('email', result.user.email);
                localStorage.setItem('uid', result.user.uid);
                this._login.sendInfo();

            }
            this._login.getToken().then( (token) => {
                // console.log('token set');
                localStorage.setItem('idToken', token);
                // console.log('kicking to dashboard');
                this._router.navigateByUrl('dashboard');
            })
        } )
    }

    public logout() {
        this._login.logout();
    }

}