import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SharedService} from './shared.service';

const appRoutes: Routes = [
  // { path: 'dashboard', component: DashboardComponent },
  {path: 'login', component: LoginComponent},
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    SharedService,
  ]
})

export class AppRoutingModule {
}
