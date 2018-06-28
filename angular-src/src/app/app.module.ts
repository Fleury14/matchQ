import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from './../environments/environment';
import { AppRoutingModule, RoutingComponents } from './app.routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { LoginService } from './services/login.service';
import { HttpService } from './services/http.service';
import { TokenInterceptor } from './services/http.interceptor.service';
import { TournamentService } from './services/tournament.service';
import { SubscriptionService } from './services/subscription.service';
import { UserService } from './services/user.service';
import { QueueService } from './services/queue.service';
import { InviteService } from './services/invite.service';

import { MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatTableModule } from '@angular/material';
import { DeleteModal } from './components/dashboard/delete-modal/delete-modal';
import { SearchModal } from './components/dashboard/search-modal/search-modal';
import { NavInfoService } from './services/nav-info.servce';
import { SearchUserModal } from './components/queue/search-user-modal/search-user-modal';
import { UserAccessModal } from './components/queue/user-access-modal/user-access-modal';

@NgModule({
  declarations: [
    AppComponent, RoutingComponents, NavComponent, DeleteModal, SearchModal, SearchUserModal, UserAccessModal
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatTableModule,
    HttpClientModule, FormsModule, AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule, AppRoutingModule
  ],
  entryComponents: [ DeleteModal, SearchModal, SearchUserModal, UserAccessModal ],
  providers: [ LoginService, HttpService, TournamentService, SubscriptionService, UserService, QueueService, InviteService, NavInfoService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
