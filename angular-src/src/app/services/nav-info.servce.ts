import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LoginService } from './login.service';
import * as firebase from 'firebase';

@Injectable()

export class NavInfoService {
    public navInfo:Subject<any> = new Subject<any>();
    public authState: firebase.User;

    // make sure nav gets the data on boot
    constructor(private _login: LoginService) {
        this._login.getLoggedInInfo().subscribe( data => {
            // console.log('from navservcie', data);
            this.authState = data;
            this.navInfo.next({data: this.authState});
        })
    }

    // call this whenever information changes that is displayed on the nav bar
    public updateNav() {
        // console.log('updating nav...');
        this.navInfo.next({data: this.authState})
    }

    public subscribeToNavInfo() {
        return this.navInfo.asObservable();
    }
}