import { RouterModule, Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { LoginRouterGuard } from './services/login.guard.service';
import { TournamentCreateComponent } from './components/tournament-create/tournament-create.component';
import { QueueComponent } from './components/queue/queue.component';
import { InviteComponent } from './components/invites/invite.component';

const routes:Route[] = [{
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ LoginRouterGuard ]
},
{
    path: 'create-tournament',
    component: TournamentCreateComponent,
    canActivate: [ LoginRouterGuard ]
},
{
    path: 'login',
    component: LoginComponent
},
{
    path: 'queue/:id',
    component: QueueComponent,
    canActivate: [ LoginRouterGuard ]
},
{
    path: 'invites/:id',
    component: InviteComponent,
    canActivate: [ LoginRouterGuard ]
},
{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
},
{
    path: '**',
    component: ErrorComponent
}];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers: [ LoginRouterGuard ]
})

export class AppRoutingModule {}

export const RoutingComponents = [LoginComponent, ErrorComponent, DashboardComponent, TournamentCreateComponent, QueueComponent, InviteComponent ]