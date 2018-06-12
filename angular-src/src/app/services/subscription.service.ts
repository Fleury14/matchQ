import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ITournament } from '../interfaces/tournament';
import { Observable } from 'rxjs';

@Injectable()

export class SubscriptionService {

    constructor (private _http: HttpService) {}

    public add(tourn: ITournament, uid: string):Observable<any> {

        const payload = {
            name: tourn,
            uid: uid
        }

        return this._http.post('/subscription/add', payload);
    }

    public delete(tourn: ITournament, uid:string):Observable<any> {
        const payload = {
            name: tourn,
            uid: uid
        }

        return this._http.post('/subscription/remove', payload);
    }

    public getBySub(uid: string):Observable<any> {

        const payload = {
            uid: uid
        }
        console.log('payload:', payload);
        return this._http.post('/subscription/tourn', payload);
    }
}