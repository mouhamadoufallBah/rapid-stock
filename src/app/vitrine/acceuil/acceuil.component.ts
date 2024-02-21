import { Component, OnInit } from '@angular/core';
import { ProduitService } from '../../services/produit/produit.service';
import { FormsModule } from '@angular/forms';
import Notiflix from 'notiflix';
import { CategorieService } from '../../services/categorie/categorie.service';
import { CategorieIdToCategorieNamePipe } from '../../pipes/categorie/categorie-id-to-categorie-name.pipe';
import { NgClass } from '@angular/common';




@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [FormsModule, CategorieIdToCategorieNamePipe, NgClass],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.scss'
})
export class AcceuilComponent implements OnInit {
  switchValue: boolean = false;
  categories: any[] = []
  allProducts: any[] = [];
  productsByCategorie: any[] = [];
  activeCategoryIndex: any;


  constructor(private categoryService: CategorieService, private produitService: ProduitService) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.loadAllProducts();
  }

  onActiveCategorie(categoryId: number, index: number) {
    this.activeCategoryIndex = index;
  }

  onChangeSwitchValue() {
    this.switchValue = !this.switchValue;
  }

  getAllCategories() {
    this.categoryService.getAllCategory().subscribe(
      (data) => {
        this.categories = data.data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    );

  }

  getProduitByIdCategorie(id: number) {
    this.produitService.getProductByIdCategorie(id).subscribe(
      (data) => {
        this.productsByCategorie = data.data;
      }
    )
  }

  loadAllProducts() {
    this.produitService.getAllProduct().subscribe(
      (data) => {
        this.allProducts = data.data;
      }
    )
  }
}
