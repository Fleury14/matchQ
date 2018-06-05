import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
})

export class LoginComponent {

    constructor (private _login:LoginService, private _router: Router) {}

    public login() {
        this._login.login().then( (result) => {
            console.log('result', result.credential.idToken);
            if( result.credential.idToken) {
                localStorage.setItem('idToken', result.credential.idToken);
                localStorage.setItem('displayName', result.user.displayName);
                localStorage.setItem('email', result.user.email); 
                this._router.navigateByUrl('dashboard');
            }
        } )
    }

    public logout() {
        this._login.logout();
    }

}