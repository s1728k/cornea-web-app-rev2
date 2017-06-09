import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginComponent } from './login/login.component';
import {NextCompComponent} from './next-comp/next-comp.component';

export const routes: Routes = [
  { path: 'under-construnction', component: NextCompComponent  },
  { path: 'login', component: LoginComponent },
  { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: LoginComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
