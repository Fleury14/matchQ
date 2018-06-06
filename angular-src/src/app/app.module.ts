import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from './../environments/environment';
import { AppRoutingModule, RoutingComponents } from './app.routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    AppComponent, RoutingComponents, NavComponent
  ],
  imports: [
    BrowserModule, AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule, AppRoutingModule
  ],
  providers: [ LoginService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
