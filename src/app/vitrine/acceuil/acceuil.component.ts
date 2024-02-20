import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit/produit.service';
import { FormsModule } from '@angular/forms';
import Notiflix from 'notiflix';
import { CategorieService } from '../../services/categorie/categorie.service';


@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.scss'
})
export class AcceuilComponent implements OnInit{
  switchValue: boolean = false;
  categories: any[] = []

  constructor(private categoryService: CategorieService ){}

  ngOnInit(): void {
    this.getAllCategories()
  }

  onChangeSwitchValue(){
    this.switchValue = !this.switchValue;
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
        console.log(this.categories);
        Notiflix.Loading.remove();
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    );
  }
}
