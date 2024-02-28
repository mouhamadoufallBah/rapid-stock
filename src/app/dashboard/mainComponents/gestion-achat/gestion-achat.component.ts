import { Component, ElementRef, ViewChild } from '@angular/core';
import { DatatableService } from '../../../services/datatable.service';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgIf } from '@angular/common';
import { AchatService } from '../../../services/achat/achat.service';
import Notiflix from 'notiflix';
import { CategorieService } from '../../../services/categorie/categorie.service';
import { ProduitService } from '../../../services/produit/produit.service';
import { ProduitIdToProduitNamePipe } from '../../../pipes/produit/produit-id-to-produit-name.pipe';
import { ProduitIdToProduitInfoPipe } from '../../../pipes/produit/produit-id-to-produit-info.pipe';

@Component({
  selector: 'app-gestion-achat',
  standalone: true,
  imports: [DataTablesModule, FormsModule, NgIf, DatePipe, ProduitIdToProduitNamePipe, ProduitIdToProduitInfoPipe],
  templateUrl: './gestion-achat.component.html',
  styleUrl: './gestion-achat.component.scss'
})
export class GestionAchatComponent {

  @ViewChild('closeAddExpenseModal') closeAddExpenseModal!: ElementRef;

  editValue: boolean = false;

  dtOptions: DataTables.Settings = {};
  panier: DataTables.Settings = {};


  achats: any[] = [];
  selectedAchat: any;

  categories: any;
  SelectedcategorieId: any;

  productsByCategorie: any;
  AllProducts: any[] = [];

  nomAchatAdd: string = "";
  prixachatAdd: number;
  quantiteachatAdd: number;
  produit_idAdd: number;

  exactNomAchat: boolean;
  verifNomAchat: string = "";

  exactPrixUAchat: boolean;
  verifPrixUAchat: string = "";

  exactQuantiteAchat: boolean;
  verifQuantiteAchat: string = "";

  nomProduit: string = "";
  imageProduit: string = "";
  prixUProduit: number;
  quantiteProduit: number;
  quantiteSeuilProduit: number;
  etatProduit: string = "";
  categorie_idProduit: number;
  fichierAdd: any = "";
  imageAdd: string = ""

  exactNom: boolean;
  verifNom: string = "";

  exactPrixU: boolean;
  verifPrixU: string = "";

  exactQuantiteSeuil: boolean;
  verifQuantiteSeuil: string = "";

  nomAchatUpdate: string = "";
  prixachatUpdate: number;
  quantiteachatUpdate: number;
  produit_idUpdate: number;


  constructor(private achatService: AchatService, private categorieService: CategorieService, private produitService: ProduitService) { }

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

    this.panier = {
      searching: false,
      lengthChange: false,
      paging: true,
      info: false,
      pageLength: 5,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',
      }
    };

    this.getAllAchat();
    this.getAllProducts()
  }

  getAllAchat() {
    Notiflix.Loading.init({
      svgColor: '#f47a20',
      cssAnimation: true,
      cssAnimationDuration: 360,

    });
    Notiflix.Loading.hourglass();
    this.achatService.getAllAchat().subscribe(
      (data) => {
        this.achats = data.data;
        Notiflix.Loading.remove();
      }, (error) => {
        console.error('Erreur lors de l\'affichage des achats', error);
        Notiflix.Report.failure('Une erreur s\'est produite lors de l\'affichage des achats', '', 'Okay');
        Notiflix.Loading.remove();
      }
    )
  }

  getAllCategorie() {
    this.categorieService.getAllCategory().subscribe(
      (data) => {
        this.categories = data.data;
      }
    )
  }

  getProduitByIdCategorie(id: number) {
    this.produitService.getProductByIdCategorie(id).subscribe(
      (data) => {
        this.productsByCategorie = data.data;
      }
    )
  }

  categorie: any;
  getCategorie(id: number){
    this.categorie = this.categories.find((elt: any) => elt.id === id);
    console.log(this.categorie);

  }

  getAllProducts() {
    this.produitService.getAllProduct().subscribe(
      (data) => {
        this.AllProducts = data.data;
      }
    )
  }

  getProduitById(id: number){
    this.AllProducts.find((elt: any) => elt.id === id);
  }

  getAchatById(id: number) {
    this.achatService.getAchatById(id).subscribe(
      (data) => {
        console.log(data);

        this.selectedAchat = data;
        ({
          nomachat: this.nomAchatUpdate,
          prixachat: this.prixachatUpdate,
          quantiteachat: this.quantiteachatUpdate,
          produit_id: this.produit_idUpdate,
        } = this.selectedAchat);
      }
    );
  }

  verifiNomAchat() {
    const nom = this.nomAchatAdd;

    if (nom === '') {
      this.verifNomAchat = '';
      this.exactNomAchat = false;
    } else if (
      this.validateNomPrenom(nom) &&
      nom.length >= 2
    ) {
      this.exactNomAchat = true;
      this.verifNomAchat = '';
    } else if (nom.length < 2) {
      this.exactNomAchat = false;
      this.verifNomAchat = 'au minimum avoir deux caractères ';
    } else {
      this.exactNomAchat = false;
      this.verifNomAchat = 'le nom est invalide ';
    }
  }

  verifiPrixUnitaireAchat() {
    if (this.prixachatAdd === undefined) {
      this.exactPrixUAchat = false;
      this.verifPrixUAchat = 'Ce champ accepte uniquement des chiffre23s';
    } else if (this.validateInputNumber(this.prixachatAdd)) {
      this.exactPrixUAchat = true;
    } else {
      this.exactPrixUAchat = false;
      this.verifPrixUAchat = 'Ce champ accepte uniquement des chiffres';
    }
  }

  verifiQuantiteAchat() {
    if (this.quantiteachatAdd === undefined) {
      this.exactQuantiteAchat = false;
      this.verifQuantiteAchat = 'Veuillez renseigner la quantité seuil';
    } else if (this.validateInputNumber(this.quantiteachatAdd)) {
      this.exactQuantiteAchat = true;
    } else {
      this.exactQuantiteAchat = false;
      this.verifQuantiteAchat = 'Ce champ accepte uniquement des chiffres21';
    }
  }

  onAddAchat() {
    const data: any = {
      nomachat: this.nomAchatAdd,
      prixachat: this.prixachatAdd,
      quantiteachat: this.quantiteachatAdd,
      produit_id: this.produit_idAdd
    };

    if (this.nomAchatAdd == "" || this.prixachatAdd == undefined || this.quantiteachatAdd == undefined || this.produit_idAdd == undefined) {
      Notiflix.Notify.failure('Veuillez remplir le champs');
    } else {
      Notiflix.Loading.init({
        svgColor: '#f47a20',
        cssAnimation: true,
        cssAnimationDuration: 360,

      });
      Notiflix.Loading.hourglass();
      this.achatService.addAchat(data).subscribe(
        () => {
          Notiflix.Notify.init({
            cssAnimation: true,
            cssAnimationDuration: 360,
            cssAnimationStyle: 'zoom',
          });

          Notiflix.Notify.success('Achat ajoutée avec succès');
          this.getAllAchat();

          this.closeAddExpenseModal.nativeElement.click();

          Notiflix.Loading.remove();
          this.nomAchatAdd = "";
          this.prixachatAdd = undefined;
          this.quantiteachatAdd = undefined;
          this.produit_idAdd = undefined;
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du achat', error);
          Notiflix.Report.failure('Une erreur s\'est produite lors de l\'ajout du achat', '', 'Okay');
          Notiflix.Loading.remove();
        }
      );
    }
  }

  verifiNomAchatUpdate() {
    const nom = this.nomAchatUpdate;

    if (nom === '') {
      this.verifNomAchat = '';
      this.exactNomAchat = false;
    } else if (
      this.validateNomPrenom(nom) &&
      nom.length >= 2
    ) {
      this.exactNomAchat = true;
      this.verifNomAchat = '';
    } else if (nom.length < 2) {
      this.exactNomAchat = false;
      this.verifNomAchat = 'au minimum avoir deux caractères ';
    } else {
      this.exactNomAchat = false;
      this.verifNomAchat = 'le nom est invalide ';
    }
  }

  verifiPrixUnitaireAchatUpdate() {
    if (this.prixachatUpdate === undefined) {
      this.exactPrixUAchat = false;
      this.verifPrixUAchat = 'Ce champ accepte uniquement des chiffre23s';
    } else if (this.validateInputNumber(this.prixachatUpdate)) {
      this.exactPrixUAchat = true;
    } else {
      this.exactPrixUAchat = false;
      this.verifPrixUAchat = 'Ce champ accepte uniquement des chiffres';
    }
  }

  verifiQuantiteAchatUpdate() {
    if (this.quantiteachatUpdate === undefined) {
      this.exactQuantiteAchat = false;
      this.verifQuantiteAchat = 'Veuillez renseigner la quantité seuil';
    } else if (this.validateInputNumber(this.quantiteachatUpdate)) {
      this.exactQuantiteAchat = true;
    } else {
      this.exactQuantiteAchat = false;
      this.verifQuantiteAchat = 'Ce champ accepte uniquement des chiffres21';
    }
  }

  onUpdateAchat(id: number) {
    const data: any = {
      nomachat: this.nomAchatUpdate,
      prixachat: this.prixachatUpdate,
      quantiteachat: this.quantiteachatUpdate,
      produit_id: this.produit_idUpdate
    };

    if (this.nomAchatUpdate == "" || this.prixachatUpdate == undefined || this.quantiteachatUpdate == undefined || this.produit_idUpdate == undefined) {
      Notiflix.Notify.failure('Veuillez remplir le champs');
    } else {
      Notiflix.Loading.init({
        svgColor: '#f47a20',
        cssAnimation: true,
        cssAnimationDuration: 360,

      });
      Notiflix.Loading.hourglass();
      this.achatService.updateAchat(id, data).subscribe(
        (data) => {
          Notiflix.Loading.remove();
          Notiflix.Notify.success('Achat Modifier avec succès');
          this.getAllAchat();
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du achat', error);
          Notiflix.Report.failure('Une erreur s\'est produite lors de l\'ajout du achat', '', 'Okay');
          Notiflix.Loading.remove();
        }
      )
    }

  }

  onDeleteAchat(id: number) {
    Notiflix.Confirm.init({
      okButtonBackground: '#FF1700',
      titleColor: '#FF1700'
    });
    Notiflix.Confirm.show(
      'Attention',
      'Voulez-vous annuler cette achat?',
      'Oui',
      'Non',
      () => {
        Notiflix.Loading.init({
          svgColor: '#f47a20',
        });
        Notiflix.Loading.hourglass();

        this.achatService.deleteAchat(id).subscribe(
          (response) => {
            Notiflix.Loading.remove();
            Notiflix.Notify.success('Achat annuler avec succès');
            this.getAllAchat();
          },
          (error) => {
            Notiflix.Loading.remove();
            console.error('Erreur lors de la suppression de l\'achat', error);
            Notiflix.Report.failure('Une erreur s\'est produite lors de l\annulation de l\achat', '', 'Okay');

          }
        );
      },
      () => { },
      {},
    );

  }

  upload($event) {
    this.fichierAdd = $event.target.files[0];
  }


  save() {
    if (this.fichierAdd == "") {
      Notiflix.Notify.failure('Veuillez ajouter l\'image');
    } else {
      Notiflix.Loading.init({
        svgColor: '#f47a20',
        cssAnimation: true,
        cssAnimationDuration: 360,

      });
      Notiflix.Loading.hourglass();
      this.produitService.addFile(this.fichierAdd)
        .then(downloadURL => {
          this.imageAdd = downloadURL;
          this.onAddProduitFromAchat();
        })
        .catch(error => {
          // Gérer les erreurs
          console.error('Erreur lors du téléchargement du fichier : ', error);
          alert('Échec du téléchargement du fichier.');
        });
    }

  }

  validateNomPrenom(text: string): boolean {
    const prenomNomRegex = /^[A-Za-z0-9]{2,}(?: [A-Za-z0-9]{2,})*$/;

    return prenomNomRegex.test(text);
  }

  verifiNom() {
    const nom = this.nomProduit;

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
    if (this.prixUProduit === undefined) {
      this.exactPrixU = false;
      this.verifPrixU = 'Ce champ accepte uniquement des chiffres';
    } else if (this.validateInputNumber(this.prixUProduit)) {
      this.exactPrixU = true;
    } else {
      this.exactPrixU = false;
      this.verifPrixU = 'Ce champ accepte uniquement des chiffres';
    }
  }

  verifiQuantiteSeuil() {
    if (this.quantiteSeuilProduit === undefined) {
      this.exactQuantiteSeuil = false;
      this.verifQuantiteSeuil = 'Veuillez renseigner la quantité seuil';
    } else if (this.validateInputNumber(this.quantiteSeuilProduit)) {
      this.exactQuantiteSeuil = true;
    } else {
      this.exactQuantiteSeuil = false;
      this.verifQuantiteSeuil = 'Ce champ accepte uniquement des chiffres21';
    }
  }

  onAddProduitFromAchat() {
    const data: any = {
      nomproduit: this.nomProduit,
      image: this.imageAdd,
      prixU: this.prixUProduit,
      quantite: 0,
      quantiteseuil: this.quantiteSeuilProduit,
      etat: this.quantiteProduit > this.quantiteSeuilProduit ? "En_stock" : "rupture",
      categorie_id: this.categorie_idProduit
    };

    if (this.nomProduit == "" || this.prixUProduit == undefined || this.quantiteSeuilProduit == undefined || this.categorie_idProduit == undefined) {
      Notiflix.Notify.failure('Veuillez remplir le champs');
    } else {
      Notiflix.Loading.init({
        svgColor: '#f47a20',
        cssAnimation: true,
        cssAnimationDuration: 360,

      });
      Notiflix.Loading.hourglass();
      this.produitService.addProduct(data).subscribe(
        () => {
          Notiflix.Notify.init({
            cssAnimation: true,
            cssAnimationDuration: 360,
            cssAnimationStyle: 'zoom',
          });

          Notiflix.Notify.success('Produit ajoutée avec succès');
          this.getAllProducts();

          Notiflix.Loading.remove();

          this.nomProduit = "";
          this.imageProduit = "";
          this.prixUProduit = undefined;
          this.quantiteProduit = undefined;
          this.quantiteSeuilProduit = undefined;
          this.etatProduit = "";
          this.categorie_idProduit = undefined;
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du produit', error);
          Notiflix.Report.failure('Une erreur s\'est produite lors de l\'ajout du produit', '', 'Okay');
          Notiflix.Loading.remove();
        }
      );
    }
  }

}
