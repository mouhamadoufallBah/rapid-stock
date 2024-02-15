import { Routes } from '@angular/router';
import { LoginComponent } from './security/login/login.component';
import { authGuard } from './guards/auth.guard';
import { AcceuilComponent } from './vitrine/acceuil/acceuil.component';
import { NotFoundComponent } from './errorPage/not-found/not-found.component';

export const routes: Routes = [
  {path: 'acceuil', component: AcceuilComponent},
  {path: 'connexion', component: LoginComponent},
  {path: '404', component: NotFoundComponent},
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [authGuard]},
  {path: '', redirectTo: 'connexion', pathMatch: 'full'},
  {path: '**', redirectTo: '404', pathMatch: 'full'},
];
