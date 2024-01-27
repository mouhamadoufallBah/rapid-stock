import { Component } from '@angular/core';
import { DatatableService } from '../../../services/datatable.service';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgIf } from '@angular/common';
import { AchatService } from '../../../services/achat/achat.service';
import Notiflix from 'notiflix';
import { CategorieService } from '../../../services/categorie/categorie.service';

@Component({
  selector: 'app-gestion-achat',
  standalone: true,
  imports: [DataTablesModule, FormsModule, NgIf, DatePipe],
  templateUrl: './gestion-achat.component.html',
  styleUrl: './gestion-achat.component.scss'
})
export class GestionAchatComponent {
  editValue: boolean = false;

  dtOptions: DataTables.Settings = {};
  panier: DataTables.Settings = {};


  achats: any[] = [];
  selectedAchat: any;

  categorie: any;

  nomAchatAdd: string = "";
  prixachatAdd: number;
  quantiteachatAdd: number;
  montantachatAdd: number;
  produit_idAdd: number;

  nomAchatUpdate: string = "";
  prixachatUpdate: number;
  quantiteachatUpdate: number;
  montantachatUpdate: number;
  produit_idUpdate: number;

  constructor(private achatService: AchatService, private categorieService: CategorieService) { }

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
  }


  getAllAchat() {
    this.achatService.getAllAchat().subscribe(
      (data) => {
        this.achats = data.data;

        // console.log(this.achats);

      }
    )
  }

  getAllCategorie() {
    this.categorieService.getAllCategory().subscribe(
      (data) => {
        this.categorie = data.data;
      }
    )
  }

  getAchatById(id: number) {
    this.achatService.getAchatById(id).subscribe(
      (data) => {
        this.selectedAchat = data;
        console.log(this.selectedAchat);

        ({
          nomAchatUpdate: this.nomAchatUpdate,
          prixachatUpdate: this.prixachatUpdate,
          quantiteachatUpdate: this.quantiteachatUpdate,
          montantachatUpdate: this.montantachatUpdate,
          produit_idUpdate: this.produit_idUpdate,
        } = this.selectedAchat);
      }
    )
  }

  onAddAchat() {
    const data: any = {
      nomproduit: this.nomAchatAdd,
      prixachat: this.prixachatAdd,
      quantiteachat: this.quantiteachatAdd,
      montantachat: this.montantachatAdd,
      produit_id: this.produit_idAdd
    };

    if (this.nomAchatAdd == "" || this.prixachatAdd == undefined || this.quantiteachatAdd == undefined || this.montantachatAdd == undefined || this.produit_idAdd == undefined) {
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
          console.log(this.achats);

          Notiflix.Loading.remove();
          this.nomAchatAdd = "";
          this.prixachatAdd = undefined;
          this.quantiteachatAdd = undefined;
          this.montantachatAdd = undefined;
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

  

  onEdit() {
    this.editValue = !this.editValue;
  }

  onClickEnter(): void {
    this.saveChanges();

  }

  saveChanges(): void {
    this.editValue = false;
  }
}
