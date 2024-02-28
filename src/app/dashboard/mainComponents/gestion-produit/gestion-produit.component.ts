import { NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { ProduitService } from '../../../services/produit/produit.service';

import Notiflix from 'notiflix';
import { FormsModule } from '@angular/forms';
import { CategorieService } from '../../../services/categorie/categorie.service';
import { CategorieIdToCategorieNamePipe } from '../../../pipes/categorie/categorie-id-to-categorie-name.pipe';


@Component({
  selector: 'app-gestion-produit',
  standalone: true,
  imports: [NgIf, DataTablesModule, FormsModule,CategorieIdToCategorieNamePipe],
  templateUrl: './gestion-produit.component.html',
  styleUrl: './gestion-produit.component.scss'
})
export class GestionProduitComponent implements OnInit {

  @ViewChild('closeAddExpenseModal') closeAddExpenseModal!: ElementRef; //closing the bootstrap modal

  produits: any[] = [];
  selectedProduit: any;

  categories: any;


  nomAdd: string = "";
  imageAdd: string = "";
  prixUAdd: number;
  quantiteAdd: number = 0;
  quantiteSeuilAdd: number;
  etatAdd: string = "";
  categorie_idAdd: number;

  fichierAdd: any="";

  nomUpdate: string = "";
  imageUpdate: string = "";
  prixUUpdate: number;
  quantiteUpdate: number;
  quantiteSeuilUpdate: number;
  etatUpdate: string = "";
  categorie_idUpdate: number;

  exactCategorie: boolean;
  verifCategorie: string = "";

  exactNom: boolean;
  verifNom: string = "";



  exactPrixU: boolean;
  verifPrixU: string = "";

  exactQuantiteSeuil: boolean;
  verifQuantiteSeuil: string = "";

  dtOptions: DataTables.Settings = {};

  constructor(private produitService: ProduitService, private categorieService: CategorieService) { }

  ngOnInit(): void {
    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      info: false,
      pageLength: 7,
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

  upload(event: any){
    this.fichierAdd = event.target.files[0];
  }

  save() {
    if (this.fichierAdd==""){
      Notiflix.Notify.failure('Veuillez ajouter l\'image');
    }else{
      Notiflix.Loading.init({
        svgColor: '#f47a20',
        cssAnimation: true,
        cssAnimationDuration: 360,

      });
      Notiflix.Loading.hourglass();
      this.produitService.addFile(this.fichierAdd)
        .then(downloadURL => {
          // Utiliser l'URL de téléchargement, par exemple :
          console.log('Fichier téléchargé avec succès ! URL :', downloadURL);
          this.imageAdd = downloadURL;
          this.onAddProduit();

          this.closeAddExpenseModal.nativeElement.click();
        })
        .catch(error => {
          // Gérer les erreurs
          console.error('Erreur lors du téléchargement du fichier : ', error);
          alert('Échec du téléchargement du fichier.');
        });
    }

  }

  validateCategorie() {
    if (this.categorie_idAdd == undefined) {
      this.verifCategorie = 'Veuillez selectionner la catégorie';
      this.exactCategorie = false;
    } else if (this.categorie_idAdd != undefined) {
      this.exactCategorie = true;
    }
  }

  validateNomPrenom(text: string): boolean {
    const prenomNomRegex = /^[A-Za-z0-9]{2,}(?: [A-Za-z0-9]{2,})*$/;

    return prenomNomRegex.test(text);
  }

  verifiNom() {
    const nom = this.nomAdd.length>0? this.nomAdd.trim(): this.nomUpdate.trim();

    if (nom === '') {
      this.verifNom = '';
      this.exactNom = false;
    } else if (
      this.validateNomPrenom(nom) &&
      nom.length >= 2
    ) {
      this.exactNom = true;
      this.verifNom = '';
    } else if (nom.length < 2) {
      this.exactNom = false;
      this.verifNom = 'au minimum avoir deux caractères ';
    } else {
      this.exactNom = false;
      this.verifNom = 'le nom est invalide ';
    }
  }

  validateInputNumber(chiffre: any): boolean {
    const regex = /^[0-9]+$/;
    return regex.test(chiffre);
  }

  verifPrixUnitaire() {
    if (this.prixUAdd === undefined) {
      this.exactPrixU = false;
      this.verifPrixU = 'Ce champ accepte uniquement des chiffres';
    } else if (this.validateInputNumber(this.prixUAdd)) {
      this.exactPrixU = true;
    } else {
      this.exactPrixU = false;
      this.verifPrixU = 'Ce champ accepte uniquement des chiffres';
    }
  }

  verifiQuantiteSeuil() {
    if (this.quantiteSeuilAdd === undefined) {
      this.exactQuantiteSeuil = false;
      this.verifQuantiteSeuil = 'Ce champ accepte uniquement des chiffres';
    } else if (this.validateInputNumber(this.quantiteSeuilAdd)) {
      this.exactQuantiteSeuil = true;
    } else {
      this.exactQuantiteSeuil = false;
      this.verifQuantiteSeuil = 'Ce champ accepte uniquement des chiffres';
    }
  }

  verifPrixUnitaireUpdate() {
    if (this.prixUUpdate === undefined) {
      this.exactPrixU = false;
      this.verifPrixU = 'Ce champ accepte uniquement des chiffres';
    } else if (this.validateInputNumber(this.prixUUpdate)) {
      this.exactPrixU = true;
    } else {
      this.exactPrixU = false;
      this.verifPrixU = 'Ce champ accepte uniquement des chiffres';
    }
  }

  verifiQuantiteSeuilUpdate() {
    if (this.quantiteSeuilUpdate === undefined) {
      this.exactQuantiteSeuil = false;
      this.verifQuantiteSeuil = 'Ce champ accepte uniquement des chiffres';
    } else if (this.validateInputNumber(this.quantiteSeuilUpdate)) {
      this.exactQuantiteSeuil = true;
    } else {
      this.exactQuantiteSeuil = false;
      this.verifQuantiteSeuil = 'Ce champ accepte uniquement des chiffres';
    }
  }

  onAddProduit() {
    const data: any = {
      nomproduit: this.nomAdd,
      image: this.imageAdd,
      prixU: this.prixUAdd,
      quantite: this.quantiteAdd,
      quantiteseuil: this.quantiteSeuilAdd,
      categorie_id: this.categorie_idAdd
    };

    if (this.nomAdd == "" || this.prixUAdd == undefined || this.quantiteAdd == undefined || this.quantiteSeuilAdd == undefined || this.categorie_idAdd == undefined) {
      Notiflix.Notify.failure('Veuillez remplir le champs');
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

          Notiflix.Notify.init({
            cssAnimation: true,
            cssAnimationDuration: 360,
            cssAnimationStyle: 'zoom'
          });


          Notiflix.Notify.success('Produit ajoutée avec succès');
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
    this.getAllCategorie();
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
      }
    )
  }

  onUpdateProduit(id: number) {
    this.getAllCategorie();
    const data: any = {
      nomproduit: this.nomUpdate,
      image: this.imageUpdate,
      prixU: this.prixUUpdate,
      quantite: this.selectedProduit.quantite,
      quantiteseuil: this.quantiteSeuilUpdate,
      categorie_id: this.categorie_idUpdate
    };

    if (this.nomUpdate == "" || this.prixUUpdate == undefined || this.quantiteUpdate == undefined || this.quantiteSeuilUpdate == undefined || this.categorie_idUpdate == undefined) {
      Notiflix.Notify.failure('Veuillez remplir le champs');
    } else {
      Notiflix.Loading.init({
        svgColor: '#f47a20',
        cssAnimation: true,
        cssAnimationDuration: 360,
      });
      Notiflix.Loading.hourglass();

      this.produitService.updateProduct(id, data).subscribe(
        (data) => {
          Notiflix.Notify.init({
            cssAnimation: true,
            cssAnimationDuration: 360,
            cssAnimationStyle: 'zoom'
          });

          Notiflix.Notify.success('Produit modifier avec succès');
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
      'Voulez-vous supprimer cette produit?',
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
            Notiflix.Notify.success('Produit supprimée avec succès');
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
