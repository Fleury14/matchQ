import { RouterModule, Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { LoginRouterGuard } from './services/login.guard.service';

const routes:Route[] = [{
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ LoginRouterGuard ]
},
{
    path: 'login',
    component: LoginComponent
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

export const RoutingComponents = [LoginComponent, ErrorComponent, DashboardComponent ]