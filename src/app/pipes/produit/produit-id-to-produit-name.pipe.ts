import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'produitIdToProduitName',
  standalone: true
})
export class ProduitIdToProduitNamePipe implements PipeTransform {

  transform(produit_id: number, produit: any[]): string {
    const prod = produit.find(p => p.id === produit_id);
    return prod ? prod.nomproduit : 'N/A';
  }
}
