import { DatePipe, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../layouts/sidebar/sidebar.component';
import { HeaderComponent } from '../layouts/header/header.component';
import Notiflix from 'notiflix';
import { AuthService } from '../../services/users/auth.service';
import { RoleIdToroleNamePipe } from '../../pipes/user/role-id-torole-name.pipe';
import { ProduitService } from '../../services/produit/produit.service';
import { EncryptionService } from '../../services/encryption.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, NgClass, SidebarComponent, HeaderComponent, RouterLink, RoleIdToroleNamePipe,RouterLinkActive, DatePipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  toggleMenu: boolean = false;

  userConnected: any;

  roles: any[]

  sidebarItems = [
    { id: 1, title: "Tableau de bord", lien: "./acceuil-dashboard", icon: "fas fa-tachometer-alt me-2", role_id: [1, 2], isActive: false },
    { id: 2, title: "Gestion des ventes", lien: "./gestion-vente", icon: "fas fa-chart-line me-2", role_id: [1, 2], isActive: false },
    { id: 3, title: "Gestion des Achat", lien: "./gestion-achat", icon: "fas fa-chart-line me-2", role_id: [1, 2], isActive: false },
    { id: 4, title: "Gestion des produits", lien: "./gestion-produit", icon: "fas fa-cube me-2", role_id: [1, 2], isActive: false },
    { id: 5, title: "Gestion des catégories", lien: "./gestion-catégorie", icon: "fas fa-tags me-2", role_id: [1, 2], isActive: false },
    { id: 6, title: "Gestion des clients", lien: "./gestion-client", icon: "fas fa-users me-2", role_id: [1, 2], isActive: false },
    { id: 7, title: "Gestion des employés", lien: "./gestion-employe", icon: "fas fa-user-tie me-2", role_id: [1], isActive: false },

    // { title: "Gestion des accomptes", lien: "./gestion-accompte", icon: "fas fa-money-check-alt me-2", role_id: [1,2] },
    // { title: "Gestion des inventaires", lien: "", icon: "fas fa-list me-2" },
    // { title: "Gestion des stocks", lien: "", icon: "fas fa-user-tie me-2" },
  ]

  notification: any[] = [];

  constructor(private authService: AuthService,private route: Router, private routeActive: ActivatedRoute, private produitService: ProduitService, private encryptionService: EncryptionService){ }

  ngOnInit(): void {

   this.roles = [
      { id: 1, nom: 'Propriètaire' },
      { id: 2, nom: 'Employée' },
    ];



     const userConnectedString = this.encryptionService.decryptionAES(localStorage.getItem('userOnline'));

    if (userConnectedString) {
      this.userConnected = JSON.parse(userConnectedString);
    } else {
      console.error('L\'utilisateur connecté n\'a pas été trouvé dans le local storage');
    }

    this.allNotication();
  }

  filteredSidebarItems(): any[] {
    if (this.userConnected) {
      // Utilisez la méthode filter pour filtrer les éléments du menu en fonction du rôle de l'utilisateur
      return this.sidebarItems.filter(item => item.role_id.includes(this.userConnected.role_id));
    } else {
      return [];
    }
  }

  activeItemId: number | null = null;

  changeColor(id: number): void {
    this.activeItemId = id;
  }

  onToggleMenu() {
    this.toggleMenu = !this.toggleMenu;
    // console.log(this.toggleMenu)
  }

  logout(): void {
    Notiflix.Loading.init({
      svgColor:'#f47a20',
    });
    Notiflix.Loading.hourglass();
    this.authService.logout().subscribe(
      () => {
        Notiflix.Loading.remove();
        localStorage.removeItem('access_token');
        // Déconnexion réussie, redirigez l'utilisateur vers la page de connexion par exemple
        this.route.navigate(['/connexion']);
      },
      (error) => {
        console.error('Erreur lors de la déconnexion', error);

        Notiflix.Loading.remove();

        if (error.status === 401) {
          Notiflix.Report.failure('Pas de tokken', '', 'Okay');
        } else {
          Notiflix.Report.failure('Erreur inattendue', 'Une erreur s\'est produite lors de la connexion', 'Okay');
        }
      }
    );
  }

  allNotication(){
    this.produitService.getAllNotification().subscribe(
      (data) => {
        console.log(data.Notification);
        this.notification = data.Notification;
      }
    )
  }

  readNotication(id: string){
    this.produitService.updateEtatNotification(id).subscribe(
      (data) => {
        console.log(data);
        this.allNotication();
      }
    )
  }

}
