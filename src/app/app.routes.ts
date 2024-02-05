import { Routes } from '@angular/router';
import { LoginComponent } from './security/login/login.component';
import { authGuard } from './guards/auth.guard';
import { AcceuilComponent } from './vitrine/acceuil/acceuil.component';

export const routes: Routes = [
  {path: 'acceuil', component: AcceuilComponent},
  {path: 'connexion', component: LoginComponent},
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [authGuard]},
  {path: '', redirectTo: 'connexion', pathMatch: 'full'}
];
