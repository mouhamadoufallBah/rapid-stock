import { Component } from '@angular/core';
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
import { data } from 'jquery';
import { ProduitIdToProduitInfoPipe } from '../../../pipes/produit/produit-id-to-produit-info.pipe';
import { VenteIdToVenteInfoPipe } from '../../../pipes/vente/vente-id-to-vente-info.pipe';


@Component({
  selector: 'app-gestion-vente',
  standalone: true,
  imports: [DataTablesModule, FormsModule, NgIf, ProduitIdToProduitNamePipe, DatePipe, ProduitIdToProduitPricePipe, ClientIdToClientInfoPipe, ProduitIdToProduitInfoPipe, VenteIdToVenteInfoPipe],
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
  client_id: number = null;

  cartProducts: any[] = [];
  sommeCart: number = 0;
  recupCartForUpdate: any;

  cartForUpdate: any [] = [];

  dtOptions: DataTables.Settings = {};
  panier: DataTables.Settings = {};


  constructor(private venteService: VenteService, private categorieService: CategorieService, private produitService: ProduitService, private clientService: ClientService) { }

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
    this.getAllVente();
    this.getAllProducts();
    this.getAllClient();
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
        Notiflix.Report.failure('Une erreur s\'est produite lors de l\'affichage des Ventes', '', 'Okay');
        Notiflix.Loading.remove();
      }
    )
  }

  getAllCategorie() {
    this.categorieService.getAllCategory().subscribe(
      (data) => {
        this.categories = data.data;
        console.log(this.categories);

      }
    )
  }

  getProduitByIdCategorie(id: number) {
    this.produitService.getProductByIdCategorie(id).subscribe(
      (data) => {
        this.productsByCategorie = data.data;
        console.log(data);
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

      console.warn(this.selectedVenteToUpdate);

      // Récupération des informations détaillées de la vente (panier) de manière asynchrone
      await this.getSelectedVente(this.selectedVenteToUpdate.id);

    } catch (error) {
      console.error('Erreur lors de la récupération des informations détaillées de la vente', error);
    }
  }

  getSelectedVente(id: number) {
      this.venteService.getVenteInfo(id).subscribe(
        (data) =>{
          this.selectedVente = data.data;
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
            Notiflix.Report.success('Vente annuler avec succès', '', 'Okay');
            this.getAllVente();
          },
          (error) => {
            Notiflix.Loading.remove();
            console.error('Erreur lors de la suppression de la vente', error);
            Notiflix.Report.failure('Une erreur s\'est produite lors de l\annulation de la vente', '', 'Okay');

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

  removeProductFromCart(productId: number) {
    let cartProducts: any[] = JSON.parse(localStorage.getItem('cart')) || [];

    const productIndex = cartProducts.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
      cartProducts.splice(productIndex, 1);

      localStorage.setItem('cart', JSON.stringify(cartProducts));

      this.getProductFromCart();
    }
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
    if (data.client_id === null) {
      Notiflix.Report.failure('Veuillez renseigner le client', '', 'Okay');
    } if (data.produit.length === 0) {
      Notiflix.Report.failure('Le panier est vide veuillez', '', 'Okay');
    } else {
      Notiflix.Loading.init({
        svgColor: '#f47a20',
        cssAnimation: true,
        cssAnimationDuration: 360,

      });
      Notiflix.Loading.hourglass();

      this.venteService.addVente(data).subscribe(
        (response) => {
          console.log(response);
          this.clearCart();

          this.getProductFromCart();


          Notiflix.Report.success('Vente ajoutée avec succès', '', 'Okay');
          this.getAllVente();
          // console.log(this.achats);
          Notiflix.Loading.remove();

        }
      );
    }
  }

  clearCart(){
    localStorage.removeItem('cart');
  }

}
