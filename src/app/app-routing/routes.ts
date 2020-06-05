import { Routes } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { LoginComponent } from '../login/login.component';
import { HomeComponent} from '../home/home.component';


export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'login',  component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];