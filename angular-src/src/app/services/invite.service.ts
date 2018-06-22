import { Injectable } from '@angular/core'
import { HttpService } from './http.service';

@Injectable()

export class InviteService {

    constructor(private _http:HttpService) {}

    public add(uid: string, tournId: string, tournName: string) {
        const payload = {
            uid: uid,
            tournId: tournId,
            tournName: tournName
        }
        return this._http.post('/invite/add', payload);
    }

    public accept(uid: string, tournId: string, tournName: string) {
        const payload = {
            uid: uid,
            tournId: tournId,
            tournName: tournName
        }
        return this._http.post('/invite/accept', payload);
    }

    public remove(uid: string, tournId: string) {
        const payload = {
            uid: uid,
            tournId: tournId
        }
        return this._http.post('/invite/remove', payload);
    }
}