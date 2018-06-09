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

        // this.loginSub = this._login.getLoggedInInfo().subscribe( (info) => {
        //     console.log('userinfo', info);
        //     if (info) {
        //         document.querySelector('.nav-bar ul').classList.remove('faded');
        //     } else {
        //         document.querySelector('.nav-bar ul').classList.add('faded');
        //     }
        // });

        this.userSub = this._login.getInfo().subscribe( (response) => {
            if(response) {
                this.displayName = response.userName;
                document.querySelector('.nav-bar ul').classList.remove('faded');    
            } else {
                this.displayName = null;
                document.querySelector('.nav-bar ul').classList.add('faded');
            }
            
        });
       
    }

    public logout() {
        this._login.logout();
        this._router.navigateByUrl('/');
    }
}