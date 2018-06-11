import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()

export class HttpService {
    
    constructor(private _http: HttpClient) {}

    public post(url:string, payload:any) {
        const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        return this._http.post(environment.apiURL + url, payload, {headers});
    }

    public delete(url:string, payload:any) {
        const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
        return this._http.delete(environment.apiURL + url, {headers});
    }

    private _tokenRefreshCheck() {
        
    }
}