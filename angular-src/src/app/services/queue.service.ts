import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IMatch } from '../interfaces/match';


@Injectable()

export class QueueService {

    constructor( private _http:HttpService) {}

    public toggleActive(name) {
        const payload = {
            name: name
        }
        return this._http.post('/queue/toggle', payload);
    }

    public removeAccess(uid:string, tournId:string) {
        const payload = {
            uid: uid,
            tournId: tournId
        }
        return this._http.post('/queue/remove-access', payload);
    }

    public getMatches(tournId: string) {
        const payload = {
            tournId: tournId
        };
        return this._http.post('/match/list', payload);
    }

    public addMatch(tournId: string, uid: string, match: IMatch) {
        const payload = {
            match: match,
            tournId: tournId,
            uid: uid
        };
        return this._http.post('match/add', payload);
    }
}
