import { RouterModule, Route } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';

const routes:Route[] = [{
    path: 'dashboard',
    component: DashboardComponent
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
    exports: [ RouterModule ]
})

export class AppRoutingModule {}

export const RoutingComponents = [LoginComponent, ErrorComponent, DashboardComponent ]