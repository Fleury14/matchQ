import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import * as firebase from 'firebase';
import { mergeMap } from 'rxjs/operators';

export class TokenInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(firebase.auth().currentUser.getIdToken(true)).pipe(
            mergeMap(token => {
                req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                    }
                });
                return next.handle(req);
            })
        )   
    }
}