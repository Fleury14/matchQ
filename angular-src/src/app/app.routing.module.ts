import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './../components/login/login.component';
import { DashboardComponent } from './../components/dashboard/dashboard.component';

const appRoute = [{
    path: 'login',
    component: LoginComponent
}, {
    path: 'dashboard',
    component: DashboardComponent
}, {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
}];

@NgModule({
    imports: [ RouterModule.forRoot(appRoute) ],
    exports: [ RouterModule ],
})

export class AppRoutingModule {

}

export const routingComponents = [ LoginComponent, DashboardComponent ];
