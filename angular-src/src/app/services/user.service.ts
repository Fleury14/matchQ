import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';

@Injectable()

export class UserService {

    constructor(private _http: HttpService) {}

    public add(displayName:string, email: string, uid: string) {
        const payload = {
            displayName: displayName,
            email: email,
            uid: uid
        }
        return this._http.post('/user/add', payload);
    }

    public check(uid: string) {
        const payload = {
            uid: uid
        }
        return this._http.post('/user/check', payload);
    }

    public search(search:string) {
        const payload = {
            search: search
        };

        return this._http.post('/user/search', payload);
    }

    public invites(uid:string) {
        const payload = {
            uid: uid
        }
        return this._http.post('/user/check', payload).pipe(
            map(response => {
                if(!response['user']) {
                    return null;
                } else {
                    return response['user'].invites;
                }
            })
        )
    }
}