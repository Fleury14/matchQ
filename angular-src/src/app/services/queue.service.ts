import { Injectable } from '@angular/core';
import { HttpService } from './http.service';


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
}
