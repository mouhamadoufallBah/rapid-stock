import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categorieIdToCategorieName',
  standalone: true
})
export class CategorieIdToCategorieNamePipe implements PipeTransform {

  transform(categorie_id: number, categorie: any[]): string {
    const cat = categorie.find(p => p.id === categorie_id);
    return cat ? cat.nom : 'N/A';
  }

}
