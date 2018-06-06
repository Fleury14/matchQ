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
}