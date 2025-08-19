import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { PlayerComponent } from './components/player/player';
import { RegisterComponent } from './components/register/register'; 
import { PlayerDetailComponent } from './components/player-detail/player-detail';
import { PlayerCreateComponent } from './components/player-create/player-create';
import { HomeComponent } from './components/home/home';

import { authGuard } from './services/auth/authGuard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }, 
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: '', redirectTo: 'home', pathMatch: 'full' }, 
    { path: 'players', component: PlayerComponent, canActivate: [authGuard] },
    { path: 'player/:id', component: PlayerDetailComponent, canActivate: [authGuard] },
    { path: 'create-player', component: PlayerCreateComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: 'home' } 
];