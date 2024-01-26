import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { DatatableService } from '../../../services/datatable.service';

@Component({
  selector: 'app-gestion-produit',
  standalone: true,
  imports: [NgIf, DataTablesModule],
  templateUrl: './gestion-produit.component.html',
  styleUrl: './gestion-produit.component.scss'
})
export class GestionProduitComponent implements OnInit {

  produits: [];

  dbProduit = [
    { id: 1, nom: "Clé à molette", categorie: "Outils", quantite: 50, prixUnitaire: 10.99, quantiteSeuil: 10, etat: "En stock", image: "url_de_l_image1" },
    { id: 2, nom: "Vis à bois", categorie: "Quincaillerie générale", quantite: 150, prixUnitaire: 0.05, quantiteSeuil: 10, etat: "En stock", image: "url_de_l_image2" },
    { id: 3, nom: "Marteau", categorie: "Outils", quantite: 0, prixUnitaire: 15.99, quantiteSeuil: 10, etat: "Rupture de stock", image: "url_de_l_image3" },
    { id: 4, nom: "Serrure de porte", categorie: "Sécurité", quantite: 15, prixUnitaire: 25.49, quantiteSeuil: 10, etat: "En stock", image: "url_de_l_image4" },
    { id: 5, nom: "Scie circulaire", categorie: "Outils", quantite: 5, prixUnitaire: 49.99, quantiteSeuil: 10, etat: "Niveau d'alerte ", image: "url_de_l_image5" },
    { id: 6, nom: "Clous", categorie: "Quincaillerie générale", quantite: 500, prixUnitaire: 0.02, quantiteSeuil: 10, etat: "En stock", image: "url_de_l_image6" },
    { id: 7, nom: "Tournevis", categorie: "Outils", quantite: 40, prixUnitaire: 8.99, quantiteSeuil: 10, etat: "En stock", image: "url_de_l_image7" },
    { id: 8, nom: "Gonds de porte", categorie: "Quincaillerie générale", quantite: 25, prixUnitaire: 2.49, quantiteSeuil: 10, etat: "En stock", image: "url_de_l_image8" },
    { id: 9, nom: "Équerre", categorie: "Outils", quantite: 35, prixUnitaire: 4.99, quantiteSeuil: 10, etat: "En stock", image: "url_de_l_image9" },
    { id: 10, nom: "Ampoules", categorie: "Éclairage", quantite: 200, prixUnitaire: 1.99, quantiteSeuil: 10, etat: "En stock", image: "url_de_l_image10" },
    { id: 11, nom: "Pince coupante", categorie: "Outils", quantite: 0, prixUnitaire: 12.49, quantiteSeuil: 10, etat: "Rupture de stock", image: "url_de_l_image11" },
    { id: 12, nom: "Cadenas", categorie: "Sécurité", quantite: 20, prixUnitaire: 8.49, quantiteSeuil: 10, etat: "En stock", image: "url_de_l_image12" },
    { id: 13, nom: "Ruban adhésif", categorie: "Quincaillerie générale", quantite: 30, prixUnitaire: 3.99, quantiteSeuil: 10, etat: "En stock", image: "url_de_l_image13" },
    { id: 14, nom: "Niveau à bulle", categorie: "Outils", quantite: 9, prixUnitaire: 17.99, quantiteSeuil: 10, etat: "Niveau d'alerte", image: "url_de_l_image14" },
    { id: 15, nom: "Charnières de porte", categorie: "Quincaillerie générale", quantite: 22, prixUnitaire: 6.99, quantiteSeuil: 10, etat: "En stock", image: "url_de_l_image15" }
  ];

  dtOptions: DataTables.Settings = {};

  constructor(private dt: DatatableService){}

  ngOnInit(): void {
    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      info: false,
      pageLength: 9,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',
      }
    };
  }

  getAllProducts(){
    
  }

}
