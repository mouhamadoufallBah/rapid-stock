import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgIf } from '@angular/common';
import { VenteService } from '../../../services/vente/vente.service';
import Notiflix from 'notiflix';
import { CategorieService } from '../../../services/categorie/categorie.service';
import { ProduitService } from '../../../services/produit/produit.service';
import { ProduitIdToProduitNamePipe } from '../../../pipes/produit/produit-id-to-produit-name.pipe';
import { tap, catchError, of, take } from 'rxjs';
import { ProduitIdToProduitPricePipe } from '../../../pipes/produit/produit-id-to-produit-price.pipe';
import { ClientService } from '../../../services/client/client.service';
import { ClientIdToClientInfoPipe } from '../../../pipes/clients/client-id-to-client-info.pipe';
import { ProduitIdToProduitInfoPipe } from '../../../pipes/produit/produit-id-to-produit-info.pipe';
import { VenteIdToVenteInfoPipe } from '../../../pipes/vente/vente-id-to-vente-info.pipe';
import { PaiementService } from '../../../services/paiement/paiement.service';
import { FactureService } from '../../../services/facture/facture.service';
import { NgxPrintModule } from 'ngx-print';
import { UserIdToUserInfoPipe } from '../../../pipes/user/user-id-to-user-info.pipe';
import { AuthService } from '../../../services/users/auth.service';


@Component({
  selector: 'app-gestion-vente',
  standalone: true,
  imports: [DataTablesModule, FormsModule, NgIf, ProduitIdToProduitNamePipe, DatePipe, ProduitIdToProduitPricePipe, ClientIdToClientInfoPipe, ProduitIdToProduitInfoPipe, VenteIdToVenteInfoPipe, UserIdToUserInfoPipe, NgxPrintModule],
  templateUrl: './gestion-vente.component.html',
  styleUrl: './gestion-vente.component.scss'
})
export class GestionVenteComponent {

  ventes: any[] = [];
  categories: any[] = [];
  productsByCategorie: any;
  AllProducts: any[] = [];
  selectedVente: any;
  selectedVenteToUpdate: any;
  SelectedcategorieId: any;

  allClient: any[] = [];
  allUsers: any[] = [];
  client_id: number = null;

  cartProducts: any[] = [];
  sommeCart: number = 0;
  recupCartForUpdate: any;

  cartForUpdate: any[] = [];

  //paiement Ngmodel
  etatPaiment: string = "";
  montantPaiment!: number;

  idVent: any;
  montantVersementAcompte: any;

  selectedFacture: any = {};

  dtOptions: DataTables.Settings = {};
  panier: DataTables.Settings = {};

  quantityField: boolean = false;
  quantityFromInput: number = 0;

  constructor(private venteService: VenteService, private categorieService: CategorieService, private produitService: ProduitService, private clientService: ClientService, private paiementService: PaiementService, private factureService: FactureService, private authService: AuthService) { }

  ngOnInit(): void {
    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      info: false,
      pageLength: 8,
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
    this.getAllVente();
    this.getAllProducts();
    this.getAllClient();
    this.getAllUsers();
  }

  getAllUsers() {
    this.authService.getAllEmploye().subscribe(
      (response) => {
        this.allUsers = response.data;
      }

    )
  }

  getAllVente() {
    Notiflix.Loading.init({
      svgColor: '#f47a20',
      cssAnimation: true,
      cssAnimationDuration: 360,

    });
    Notiflix.Loading.hourglass();
    this.venteService.getAllVente().subscribe(
      (data) => {
        this.ventes = data.data;
        // console.warn(data);

        Notiflix.Loading.remove();
      }, (error) => {
        console.error('Erreur lors de l\'affichage des Ventes', error);
        Notiflix.Notify.failure('Une erreur s\'est produite lors de l\'affichage des Ventes');
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
        // console.log(data);
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

  getAllClient() {
    this.clientService.getAllClient().subscribe(
      (data: any) => {
        this.allClient = data.data;
        // console.log(data);

      });
  }

  async getVenteById(id: number) {
    try {
      const venteData = await this.venteService.getVenteById(id).toPromise();
      this.selectedVenteToUpdate = venteData;

      // console.warn(this.selectedVenteToUpdate);

      // Récupération des informations détaillées de la vente (panier) de manière asynchrone
      await this.getSelectedVente(this.selectedVenteToUpdate.id);

    } catch (error) {
      console.error('Erreur lors de la récupération des informations détaillées de la vente', error);
    }
  }

  getSelectedVente(id: number) {
    this.venteService.getVenteInfo(id).subscribe(
      (data) => {
        this.selectedVente = data.data;
        // console.log(this.selectedVente.paiementInfo.montant_restant, "les facture");
      }
    );
  }

  onDeleteVente(id: any) {
    Notiflix.Confirm.init({
      okButtonBackground: '#FF1700',
      titleColor: '#FF1700'
    });
    Notiflix.Confirm.show(
      'Attention',
      'Voulez-vous annuler cette vente?',
      'Oui',
      'Non',
      () => {
        Notiflix.Loading.init({
          svgColor: '#f47a20',
        });
        Notiflix.Loading.hourglass();

        this.venteService.deleteVente(id).subscribe(
          (response) => {
            console.log(response)
            Notiflix.Loading.remove();
            Notiflix.Notify.success('Vente annuler avec succès');
            this.getAllVente();
          },
          (error) => {
            Notiflix.Loading.remove();
            console.error('Erreur lors de la suppression de la vente', error);
            Notiflix.Notify.failure('Une erreur s\'est produite lors de l\annulation de la vente');

          }
        );
      },
      () => { },
      {},
    );

  }

  addProductToCart(product: any) {
    let cartProducts: any[] = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cartProducts.find(item => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantiteVendu += 1;
    } else {
      cartProducts.push({ ...product, quantiteVendu: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cartProducts));

    this.getProductFromCart()

  }

  getProductFromCart(): any[] {
    this.cartProducts = JSON.parse(localStorage.getItem('cart')) || [];
    this.sommeCart = 0;

    this.cartProducts.forEach((item: any) => {
      this.sommeCart += item.prixU * item.quantiteVendu;
    });
    return this.cartProducts;
  }

  reduceProductQuantite(productId: number) {
    let cartProducts: any[] = JSON.parse(localStorage.getItem('cart')) || [];

    const productIndex = cartProducts.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
      cartProducts[productIndex].quantiteVendu -= 1;

      if (cartProducts[productIndex].quantiteVendu === 0) {
        cartProducts.splice(productIndex, 1);
      }

      localStorage.setItem('cart', JSON.stringify(cartProducts));

      this.getProductFromCart();
    }
  }

  addProductQuantite(productId: number) {
    let cartProducts: any[] = JSON.parse(localStorage.getItem('cart')) || [];

    const productIndex = cartProducts.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
      cartProducts[productIndex].quantiteVendu += 1;

      localStorage.setItem('cart', JSON.stringify(cartProducts));
      this.getProductFromCart();
    }
  }

  onChangeQuantityFieldValue(item: any) {
    this.quantityField = !this.quantityField;
    // console.log(this.quantityField);
    this.quantityFromInput = item.quantiteVendu;
  }

  onUpdateQuantityFromInput(item: any) {
    let cartProducts: any[] = JSON.parse(localStorage.getItem('cart')) || [];

    const productIndex = cartProducts.findIndex(elt => elt.id === item.id);

    // console.log(productIndex, "index");

    for (let i = 0; i < cartProducts.length; i++) {
      if (productIndex === i) {
        cartProducts[productIndex].quantiteVendu = cartProducts[i].quantiteVendu;
      }
    }

    // Mettre à jour le localStorage après la boucle
    localStorage.setItem('cart', JSON.stringify(cartProducts));
  }

  removeProductFromCart(productId: number) {
    let cartProducts: any[] = JSON.parse(localStorage.getItem('cart')) || [];

    const productIndex = cartProducts.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
      cartProducts.splice(productIndex, 1);

      localStorage.setItem('cart', JSON.stringify(cartProducts));

      this.getProductFromCart();
    }
  }

  clearCart() {
    localStorage.removeItem('cart');
  }

  curentVenteId() {
    this.idVent = this.selectedVente.historiques[0].vente_id;
    // console.log(this.idVent);

  }

  addVente() {
    const data = {
      client_id: this.client_id,
      produit: []
    };

    this.getProductFromCart();

    this.cartProducts.forEach((item: any) => {
      data.produit.push({
        id: item.id,
        quantite: item.quantiteVendu
      });
    });

    // console.log(data, "donnée à envoyé");
    if (data.client_id == null) {
      Notiflix.Notify.failure('Veuillez renseigner le client');
    }else if (data.produit.length === 0) {
      Notiflix.Notify.failure('Le panier est vide veuillez');
    } else {
      Notiflix.Loading.init({
        svgColor: '#f47a20',
        cssAnimation: true,
        cssAnimationDuration: 360,

      });
      Notiflix.Loading.hourglass();

      this.venteService.addVente(data).subscribe(
        (response) => {
          // console.log(response, "info vente id");
          this.clearCart();

          // console.log(response.vente.id);

          if (response.message) {
            Notiflix.Loading.remove();
            Notiflix.Report.failure('La vente n\'a pas était fait ', 'La qunatité vendu est supérieur à la quantité de stock', 'Okay');
          } else {
            const paiementInfo = {
              historiquevente_id: response.vente.id,
              etat: this.etatPaiment,
              montantVerser: this.etatPaiment === "comptant" ? response.vente.montant_total : this.montantPaiment
            }

            //paiement
            this.paiementService.addPaiement(paiementInfo, response.vente.id).subscribe(
              (res) => {
                // console.log(res, "info paiment");

                const data = {
                  "payement_id": res.idPaiement,
                  "montantVerser": res.informationPaiement.montantVerser
                }

                // facture
                this.factureService.createFacture(data).subscribe(
                  (data) => {
                    // console.log(data, "info facture");

                  }
                );
              }
            );

            this.getProductFromCart();

            Notiflix.Notify.success('Vente ajoutée avec succès');
            this.getAllVente();
            // console.log(this.achats);
            Notiflix.Loading.remove();
          }

        }
      );
    }
  }

  newPaimentAcompte(id: number) {
    if (this.montantVersementAcompte == undefined) {
      Notiflix.Notify.failure('Veuillez renseigner le montant verser');
    } else {
      const data = {
        "montantVerser": this.montantVersementAcompte
      }
      Notiflix.Loading.init({
        svgColor: '#f47a20',
        cssAnimation: true,
        cssAnimationDuration: 360,

      });
      Notiflix.Loading.hourglass();
      this.paiementService.newPaiementAcompte(id, data).subscribe(
        (resp) => {
          // console.log(resp, "nouvelle versement");
          const data = {
            "payement_id": resp.payment.id,
            "montantVerser": resp.montantVerser
          }

          // facture
          this.factureService.createFacture(data).subscribe(
            (data) => {
              // console.log(data, "info facture");
              Notiflix.Loading.remove();
              Notiflix.Notify.success('Paiement enregistrer avec succès');

            }
          );
        }
      );
    }
  }

  getFactureById(id: number) {
    this.factureService.getFactureById(id).subscribe(
      (resp) => {
        // console.log(resp);
        this.selectedFacture = resp;

      }
    )
  }

}

