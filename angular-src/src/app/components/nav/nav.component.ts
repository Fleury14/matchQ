import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { TournamentService } from '../../services/tournament.service';
import { map, tap } from 'rxjs/operators';
import { ITournament } from '../../interfaces/tournament';
import * as firebase from 'firebase';
import { NavInfoService } from '../../services/nav-info.servce';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

    public displayName:string;
    public loginSub:Subscription;
    public userSub:Subscription;
    public activeStreams:number;
    public activeStreamsSub:Subscription;

    constructor (private _login: LoginService, private _router: Router, private _tourn: TournamentService, private _navInfo: NavInfoService) {}

    ngOnInit(): void {
        // console.log('nav on init');
        this.userSub = this._login.getInfo().subscribe( (response) => {
            console.log('nav response', response);
            if(response) {
                this.displayName = response.userName;
                document.querySelector('.nav-bar ul').classList.remove('faded');    
            } else {
                this.displayName = null;
                document.querySelector('.nav-bar ul').classList.add('faded');
            }
           
        });
       this._login.sendInfo();

       // subscribe to nav info subject to get data asynchronously
       this._navInfo.subscribeToNavInfo().subscribe(response => {
        //    console.log('from subject: ', response.data);
           this.getActiveStreams();
       })

    }

    public getActiveStreams() {
        this._tourn.getMyTournament(localStorage.getItem('uid')).pipe(
            map( (tournResp) => {
                const tournList:ITournament[] = tournResp['result'];
                return tournList.filter( (tourn:ITournament) => tourn.active === true );
            }),
            tap( (filteredList:ITournament[]) => {
                this.activeStreams = filteredList.length;
            })
        ).subscribe();
    }

    public logout() {
        this._login.logout();
        this._router.navigateByUrl('/');
    }
}