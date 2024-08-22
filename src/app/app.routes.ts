import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './auth.guard';  // Importiere den funktionalen Guard

export const routes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },  // Guard für Home-Route
    { path: '',   redirectTo: '/home', pathMatch: 'full',},  // Guard für Root-Route
    { path: 'login', component: LoginComponent },
    { path: '**', component: PageNotFoundComponent }
];