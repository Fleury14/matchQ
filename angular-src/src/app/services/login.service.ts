import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable, Subject } from 'rxjs';

@Injectable()

export class LoginService {

    public _loginState:Subject<any> = new Subject<any>();
    public userObs: Observable<firebase.User>;

    constructor(private _afAuth: AngularFireAuth) {
        this.userObs = this._afAuth.authState;
    }

    public login() {
        return this._afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider);
    }

    public logout() {
        localStorage.clear();
        this._loginState.next();
        return this._afAuth.auth.signOut();
    }

    public sendInfo() {
        this._loginState.next({userName: localStorage.getItem('displayName')})
    }

    public getInfo():Observable<any> {
        return this._loginState.asObservable();
    }

    public getLoggedInInfo():Observable<firebase.User> {
        // return this._afAuth.authState;
        return this.userObs;
    }

    public getToken() {
        return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
    }

}