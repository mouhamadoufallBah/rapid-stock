import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AcceuilComponent } from './mainComponents/acceuil/acceuil.component';
import { ProfileComponent } from './mainComponents/profile/profile.component';
import { GestionProduitComponent } from './mainComponents/gestion-produit/gestion-produit.component';
import { GestionCategorieComponent } from './mainComponents/gestion-categorie/gestion-categorie.component';
import { GestionClientComponent } from './mainComponents/gestion-client/gestion-client.component';
import { GestionEmployeComponent } from './mainComponents/gestion-employe/gestion-employe.component';
import { GestionAchatComponent } from './mainComponents/gestion-achat/gestion-achat.component';
import { GestionVenteComponent } from './mainComponents/gestion-vente/gestion-vente.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children:[
      {path: 'acceuil-dashboard', component:AcceuilComponent},
      {path: 'profile', component:ProfileComponent},
      {path: 'gestion-produit', component:GestionProduitComponent},
      {path: 'gestion-achat', component:GestionAchatComponent},
      {path: 'gestion-vente', component:GestionVenteComponent},
      {path: 'gestion-catégorie', component:GestionCategorieComponent},
      {path: 'gestion-client', component:GestionClientComponent},
      {path: 'gestion-employe', component:GestionEmployeComponent},
      {path: '', redirectTo: 'acceuil-dashboard', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
