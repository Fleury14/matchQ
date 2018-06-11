import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpService } from './http.service';

@Injectable()

export class TournamentService {
    constructor(private _http: HttpService) {}

    public createTournament(name: string) {
        const payload = {
            name: name,
            belongsTo: localStorage.getItem('uid')
        }

        return this._http.post(`/tournament/add`, payload);
    }

    public getMyTournament(uid: string) {
        const payload = {
            uid: uid
        }
        return this._http.post('/tournament/get-mine', payload);
    }

    public deleteTournament(name:string) {
        const payload = {
            uid: localStorage.getItem('uid'),
            name: name
        }

        return this._http.post('/tournament/delete', payload);
    }

    public searchTournament(search:string) {
        const payload = {
            uid: localStorage.getItem('uid'),
            search: search
        }
        return this._http.post('/tournament/search', payload);
    }
}