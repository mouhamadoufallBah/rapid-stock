import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import Notiflix from 'notiflix';
import { CategorieService } from '../../../services/categorie/categorie.service';
import { Category } from '../../../models/category';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gestion-categorie',
  standalone: true,
  imports: [DataTablesModule, FormsModule, DatePipe],
  templateUrl: './gestion-categorie.component.html',
  styleUrl: './gestion-categorie.component.scss'
})
export class GestionCategorieComponent implements OnInit {
  categories: any = "";
  selectedCategory: any;

  nomCategory = "";
  nomCategoryUpdate = "";


  exactNom: boolean;
  verifNom: string = "";

  dtCategories: DataTables.Settings = {};

  constructor(private categoryService: CategorieService) { }

  ngOnInit(): void {
    this.dtCategories = {
      searching: true,
      lengthChange: false,
      paging: true,
      info: false,
      pageLength: 9,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',
      },
      autoWidth: true,
    };

    this.getAllCategories();
  }

  getAllCategories() {
    Notiflix.Loading.init({
      svgColor: '#f47a20',
      cssAnimation: true,
      cssAnimationDuration: 360,
    });

    Notiflix.Loading.hourglass();

    this.categoryService.getAllCategory().subscribe(
      (data: any) => {
        this.categories = data.data;
        // console.log(this.categories);
        Notiflix.Loading.remove();
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    );
  }

  validateNomPrenom(text: string): boolean {
    const prenomNomRegex = /^[A-Za-z]{2,}(?: [A-Za-z]{2,})*$/;

    return prenomNomRegex.test(text);
  }

  verifiNom() {
    const nom = this.nomCategory.length>0? this.nomCategory.trim(): this.nomCategoryUpdate.trim();

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

  onAddCategorie() {
    const data = {
      nom: this.nomCategory
    }
    if (!this.nomCategory) {
      Notiflix.Notify.failure('Veuillez remplir le champs');
    } else {
      Notiflix.Loading.init({
        svgColor: '#f47a20',
        cssAnimation: true,
        cssAnimationDuration: 360,

      });
      Notiflix.Loading.hourglass();
      this.categoryService.addCategory(data).subscribe(
        () => {
          Notiflix.Notify.init({
            cssAnimation: true,
            cssAnimationDuration: 360,
            cssAnimationStyle: 'zoom',
          });

          Notiflix.Notify.success('Catégorie ajoutée avec succès');
          this.getAllCategories();
          Notiflix.Loading.remove();
          this.nomCategory = "";
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la catégorie', error);
          Notiflix.Report.failure('Une erreur s\'est produite lors de l\'ajout de la catégorie', '', 'Okay');
        }
      );
    }
  }

  onSelectCategorie(id: number) {
    this.selectedCategory = this.categories.find((category: any) => category.id === id);
    if(this.selectedCategory){
      ({
        nom : this.nomCategoryUpdate
      } = this.selectedCategory)
    }
  }

  onUpdateCategorie(id: number) {
    const data = {
      nom: this.nomCategoryUpdate
    }

    if (!this.nomCategoryUpdate) {
      Notiflix.Notify.failure('Veuillez remplir le champs');
    } else {
      Notiflix.Loading.init({
        svgColor: '#f47a20',
      });
      Notiflix.Loading.hourglass();

      this.categoryService.updateCategory(data, id).subscribe(
        (data: Category) => {
          Notiflix.Notify.success('Catégorie mise à jour avec succès');
          this.getAllCategories();
          Notiflix.Loading.remove();
          this.nomCategoryUpdate = "";
        },
        (error) => {
          console.error('Erreur lors de la mise à jour de la catégorie', error);
          const errorMessage = error.error && error.error.errors ? error.error.errors.nom[0] : 'Une erreur s\'est produite lors de la mise à jour de la catégorie';
          Notiflix.Report.failure('Erreur lors de la mise à jour de la catégorie', '', 'Okay');
        });
    }
  }

  onDeleteCategorie(id: number) {
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

        this.categoryService.deleteCategory(id).subscribe(
          (response) => {
            console.log()
            Notiflix.Loading.remove();
            Notiflix.Notify.success('Catégorie supprimée avec succès');
            this.getAllCategories();
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
