import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    public displayName:string;
    public loginSub:Subscription;
    public userSub:Subscription;

    constructor (private _login: LoginService, private _router: Router) {}

    ngOnInit(): void {
        console.log('nav on init');
        this.userSub = this._login.getInfo().subscribe( (response) => {
            console.log('nav response', response);
            if(response) {
                this.displayName = response.userName;
                document.querySelector('.nav-bar ul').classList.remove('faded');    
            } else {
                this.displayName = null;
                document.querySelector('.nav-bar ul').classList.add('faded');
            }
            
        });
       this._login.sendInfo();
    }

    public logout() {
        this._login.logout();
        this._router.navigateByUrl('/');
    }
}