import { Component } from '@angular/core';
import { DatatableService } from '../../../services/datatable.service';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgIf } from '@angular/common';
import { AchatService } from '../../../services/achat/achat.service';
import Notiflix from 'notiflix';
import { CategorieService } from '../../../services/categorie/categorie.service';
import { ProduitService } from '../../../services/produit/produit.service';
import { ProduitIdToProduitNamePipe } from '../../../pipes/produit/produit-id-to-produit-name.pipe';

@Component({
  selector: 'app-gestion-achat',
  standalone: true,
  imports: [DataTablesModule, FormsModule, NgIf, DatePipe, ProduitIdToProduitNamePipe],
  templateUrl: './gestion-achat.component.html',
  styleUrl: './gestion-achat.component.scss'
})
export class GestionAchatComponent {
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

  nomProduit: string = "";
  imageProduit: string = "";
  prixUProduit: number;
  quantiteProduit: number;
  quantiteSeuilProduit: number;
  etatProduit: string = "";
  categorie_idProduit: number;

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
        // console.log(this.categories);

      }
    )
  }

  getProduitByIdCategorie(id: number) {
    this.produitService.getProductByIdCategorie(id).subscribe(
      (data) => {
        this.productsByCategorie = data.data;
        // console.log(this.productsByCategorie);
      }
    )
  }

  getAllProducts() {
    this.produitService.getAllProduct().subscribe(
      (data) => {
        this.AllProducts = data.data;
        // console.log(this.productsByCategorie);
      }
    )
  }

  getAchatById(id: number) {
    Notiflix.Loading.init({
      svgColor: '#f47a20',
      cssAnimation: true,
      cssAnimationDuration: 360,

    });
    Notiflix.Loading.hourglass();
    this.achatService.getAchatById(id).subscribe(
      (data) => {
        this.selectedAchat = data;
        Notiflix.Loading.remove();
        // console.log(this.selectedAchat);

        ({
          nomachat: this.nomAchatUpdate,
          prixachat: this.prixachatUpdate,
          quantiteachat: this.quantiteachatUpdate,
          produit_id: this.produit_idUpdate,
        } = this.selectedAchat);
      }
    );
  }

  onAddAchat() {
    const data: any = {
      nomachat: this.nomAchatAdd,
      prixachat: this.prixachatAdd,
      quantiteachat: this.quantiteachatAdd,
      produit_id: this.produit_idAdd
    };

    if (this.nomAchatAdd == "" || this.prixachatAdd == undefined || this.quantiteachatAdd == undefined || this.produit_idAdd == undefined) {
      Notiflix.Report.failure('Veuillez remplir le champs', '', 'Okay');
    } else {
      Notiflix.Loading.init({
        svgColor: '#f47a20',
        cssAnimation: true,
        cssAnimationDuration: 360,

      });
      Notiflix.Loading.hourglass();
      this.achatService.addAchat(data).subscribe(
        () => {
          Notiflix.Report.init({
            cssAnimation: true,
            cssAnimationDuration: 360,
            cssAnimationStyle: 'zoom',
          });

          Notiflix.Report.success('Achat ajoutée avec succès', '', 'Okay');
          this.getAllAchat();
          // console.log(this.achats);

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

  onUpdateAchat(id: number) {
    const data: any = {
      nomachat: this.nomAchatUpdate,
      prixachat: this.prixachatUpdate,
      quantiteachat: this.quantiteachatUpdate,
      produit_id: this.produit_idUpdate
    };

    if (this.nomAchatUpdate == "" || this.prixachatUpdate == undefined || this.quantiteachatUpdate == undefined || this.produit_idUpdate == undefined) {
      Notiflix.Report.failure('Veuillez remplir le champs', '', 'Okay');
    } else {
      Notiflix.Loading.init({
        svgColor: '#f47a20',
        cssAnimation: true,
        cssAnimationDuration: 360,

      });
      Notiflix.Loading.hourglass();
      this.achatService.updateAchat(id, data).subscribe(
        (data) => {
          // console.log(data);
          Notiflix.Loading.remove();
          Notiflix.Report.success('Achat Modifier avec succès', '', 'Okay');
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
            // console.log()
            Notiflix.Loading.remove();
            Notiflix.Report.success('Achat annuler avec succès', '', 'Okay');
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

  onAddProduitFromAchat() {
    const data: any = {
      nomproduit: this.nomProduit,
      image: this.imageProduit,
      prixU: this.prixUProduit,
      quantite: this.quantiteProduit,
      quantiteseuil: this.quantiteSeuilProduit,
      etat: this.quantiteProduit > this.quantiteSeuilProduit ? "En_stock" : "rupture",
      categorie_id: this.categorie_idProduit
    };

    if (this.nomProduit == "" || this.imageProduit == "" || this.prixUProduit == undefined || this.quantiteProduit == undefined || this.quantiteSeuilProduit == undefined || this.categorie_idProduit == undefined) {
      Notiflix.Report.failure('Veuillez remplir le champs', '', 'Okay');
    } else {
      Notiflix.Loading.init({
        svgColor: '#f47a20',
        cssAnimation: true,
        cssAnimationDuration: 360,

      });
      Notiflix.Loading.hourglass();
      this.produitService.addProduct(data).subscribe(
        () => {
          Notiflix.Report.init({
            cssAnimation: true,
            cssAnimationDuration: 360,
            cssAnimationStyle: 'zoom',
          });

          Notiflix.Report.success('Produit ajoutée avec succès', '', 'Okay');
          this.getAllProducts();
          // console.log(data);

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
