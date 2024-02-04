import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'produitIdToProduitPrice',
  standalone: true
})
export class ProduitIdToProduitPricePipe implements PipeTransform {

  transform(produit_id: number, produit: any[]): string {
    const prod = produit.find(p => p.id === produit_id);
    return prod ? prod.prixU : 'N/A';
  }

}
