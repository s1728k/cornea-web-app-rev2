import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
  { path: '**', component: LoginComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);