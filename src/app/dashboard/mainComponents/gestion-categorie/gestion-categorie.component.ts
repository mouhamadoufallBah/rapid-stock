import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import Notiflix from 'notiflix';
import { CategorieService } from '../../../services/categorie/categorie.service';
import { Category } from '../../../models/category';

// import { Loading } from 'notiflix/build/notiflix-loading-aio';

@Component({
  selector: 'app-gestion-categorie',
  standalone: true,
  imports: [DataTablesModule, FormsModule],
  templateUrl: './gestion-categorie.component.html',
  styleUrl: './gestion-categorie.component.scss'
})
export class GestionCategorieComponent implements OnInit {
  categories: any;
  selectedCategory: any;

  nomCategory = "";
  nomCategoryUpdate = "";

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

  onAddCategorie() {
    if (this.nomCategory === "") {
      Notiflix.Report.failure('Veuillez remplir le champs', '', 'Okay');
    } else {
      Notiflix.Loading.init({
        svgColor: '#f47a20',
        cssAnimation: true,
        cssAnimationDuration: 360,

      });
      Notiflix.Loading.hourglass();
      this.categoryService.addCategory(this.nomCategory).subscribe(
        () => {
          Notiflix.Report.init({
            cssAnimation: true,
            cssAnimationDuration: 360,
            cssAnimationStyle: 'zoom',
          });

          Notiflix.Report.success('Catégorie ajoutée avec succès', '', 'Okay');
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
    this.nomCategoryUpdate = this.selectedCategory.nom
    console.log(this.nomCategoryUpdate);

  }

  onUpdateCategorie(id: number) {
    Notiflix.Loading.init({
      svgColor: '#f47a20',
    });
    Notiflix.Loading.hourglass();

    this.categoryService.updateCategory(this.nomCategoryUpdate, id).subscribe(
      (data: Category) => {
        Notiflix.Report.success('Catégorie mise à jour avec succès', '', 'Okay');
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

        this.categoryService.deleteCategorie(id).subscribe(
          (response) => {
            console.log()
            Notiflix.Loading.remove();
            Notiflix.Report.success('Catégorie supprimée avec succès', '', 'Okay');
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
