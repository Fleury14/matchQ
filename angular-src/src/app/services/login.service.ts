import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable()

export class LoginService {

    constructor(private _afAuth: AngularFireAuth) {}

    public login() {
        return this._afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider);
    }

    public logout() {
        localStorage.clear();
        return this._afAuth.auth.signOut();
    }

    public getLoggedInInfo():Observable<firebase.User> {
        return this._afAuth.authState;
    }

    public getToken() {
        return firebase.auth().currentUser.getIdToken(/* forceRefresh */ true);
    }

}