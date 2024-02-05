import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { ProduitService } from '../../../services/produit/produit.service';

import Notiflix from 'notiflix';
import { FormsModule } from '@angular/forms';
import { CategorieService } from '../../../services/categorie/categorie.service';


@Component({
  selector: 'app-gestion-produit',
  standalone: true,
  imports: [NgIf, DataTablesModule, FormsModule,],
  templateUrl: './gestion-produit.component.html',
  styleUrl: './gestion-produit.component.scss'
})
export class GestionProduitComponent implements OnInit {

  produits: any[] = [];
  selectedProduit: any;

  categories: any;


  nomAdd: string = "";
  imageAdd: string = "";
  prixUAdd: number;
  quantiteAdd: number;
  quantiteSeuilAdd: number;
  etatAdd: string = "";
  categorie_idAdd: number;

  nomUpdate: string = "";
  imageUpdate: string = "";
  prixUUpdate: number;
  quantiteUpdate: number;
  quantiteSeuilUpdate: number;
  etatUpdate: string = "";
  categorie_idUpdate: number;

  dtOptions: DataTables.Settings = {};

  constructor(private produitService: ProduitService, private categorieService: CategorieService) { }

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

    this.getAllProducts()
  }

  getAllProducts() {
    Notiflix.Loading.init({
      svgColor: '#f47a20',
      cssAnimation: true,
      cssAnimationDuration: 360,
    });

    Notiflix.Loading.hourglass();

    this.produitService.getAllProduct().subscribe(
      (data: any) => {
        this.produits = data.data;
        // console.log(this.produits);
        Notiflix.Loading.remove();
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    );
  }

  getAllCategorie() {
    this.categorieService.getAllCategory().subscribe(
      (data) => {
        this.categories = data.data;
        console.log(this.categories);

      }
    )
  }

  getProduitByIdCategorie() {

  }

  onAddProduit() {
    const data: any = {
      nomproduit: this.nomAdd,
      image: this.imageAdd,
      prixU: this.prixUAdd,
      quantite: this.quantiteAdd,
      quantiteseuil: this.quantiteSeuilAdd,
      // etat: this.quantiteAdd > this.quantiteSeuilAdd ? "En_stock" : "rupture",
      categorie_id: this.categorie_idAdd
    };

    if (this.nomAdd == "" || this.imageAdd == "" || this.prixUAdd == undefined || this.quantiteAdd == undefined || this.quantiteSeuilAdd == undefined || this.categorie_idAdd == undefined) {
      Notiflix.Report.failure('Veuillez remplir le champs', '', 'Okay');
    } else {
      Notiflix.Loading.init({
        svgColor: '#f47a20',
        cssAnimation: true,
        cssAnimationDuration: 360,

      });
      Notiflix.Loading.hourglass();
      this.produitService.addProduct(data).subscribe(
        (data) => {
          console.log(data);

          Notiflix.Report.init({
            cssAnimation: true,
            cssAnimationDuration: 360,
            cssAnimationStyle: 'zoom',
          });

          Notiflix.Report.success('Produit ajoutée avec succès', '', 'Okay');
          this.getAllProducts();
          // console.log(this.produits);

          Notiflix.Loading.remove();
          this.nomAdd = "";
          this.imageAdd = "";
          this.prixUAdd = undefined;
          this.quantiteAdd = undefined;
          this.quantiteSeuilAdd = undefined;
          this.etatAdd = "";
          this.categorie_idAdd = undefined;
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du produit', error);
          Notiflix.Report.failure('Une erreur s\'est produite lors de l\'ajout du produit', '', 'Okay');
          Notiflix.Loading.remove();
        }
      );
    }
  }

  getProduitById(id: number) {
    this.produitService.getProductById(id).subscribe(
      (data) => {
        this.selectedProduit = data;
        ({
          nomproduit: this.nomUpdate,
          image: this.imageUpdate,
          prixU: this.prixUUpdate,
          quantite: this.quantiteUpdate,
          quantiteseuil: this.quantiteSeuilUpdate,
          etat: data.etat,
          categorie_id: this.categorie_idUpdate
        } = this.selectedProduit);

        console.log(this.selectedProduit);

      }
    )
  }

  onUpdateProduit(id: number) {
    this.getAllCategorie();
    const data: any = {
      nomproduit: this.nomUpdate,
      image: this.imageUpdate,
      prixU: this.prixUUpdate,
      quantite: this.quantiteUpdate,
      quantiteseuil: this.quantiteSeuilUpdate,
      // etat: this.quantiteUpdate > this.quantiteSeuilUpdate ? "En_stock" : "rupture",
      categorie_id: this.categorie_idUpdate
    };

    if (this.nomUpdate == "" || this.imageUpdate == "" || this.prixUUpdate == undefined || this.quantiteUpdate == undefined || this.quantiteSeuilUpdate == undefined || this.categorie_idUpdate == undefined) {
      Notiflix.Report.failure('Veuillez remplir le champs', '', 'Okay');
    } else {
      Notiflix.Loading.init({
        svgColor: '#f47a20',
        cssAnimation: true,
        cssAnimationDuration: 360,

      });
      Notiflix.Loading.hourglass();

      this.produitService.updateProduct(id, data).subscribe(
        (data) => {
          Notiflix.Report.init({
            cssAnimation: true,
            cssAnimationDuration: 360,
            cssAnimationStyle: 'zoom',
          });

          Notiflix.Report.success('Produit modifier avec succès', '', 'Okay');
          this.getAllProducts();
        }
      );
    }
  }

  onDeleteProduit(id: number) {
    Notiflix.Confirm.init({
      okButtonBackground: '#FF1700',
      titleColor: '#FF1700'
    });
    Notiflix.Confirm.show(
      'Attention',
      'Voulez-vous supprimer cette catégorie?',
      'Oui',
      'Non',
      () => {
        Notiflix.Loading.init({
          svgColor: '#f47a20',
        });
        Notiflix.Loading.hourglass();

        this.produitService.deleteProduct(id).subscribe(
          (response) => {
            console.log()
            Notiflix.Loading.remove();
            Notiflix.Report.success('Catégorie supprimée avec succès', '', 'Okay');
            this.getAllProducts();
          },
          (error) => {
            // Une erreur s'est produite lors de la suppression de la catégorie
            console.error('Erreur lors de la suppression de la catégorie', error);
            Notiflix.Report.failure('Une erreur s\'est produite lors de la suppression de la catégorie', '', 'Okay');
          }
        );
      },
      () => { },
      {},
    );
  }

}
