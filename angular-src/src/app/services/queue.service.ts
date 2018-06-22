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

}
