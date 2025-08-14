import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { PlayerComponent } from './components/player/player';
import { RegisterComponent } from './components/register/register'; 
import { authGuard } from './services/auth/authGuard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }, 
    { path: 'players', component: PlayerComponent, canActivate: [authGuard] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login' }
];