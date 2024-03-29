import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'produitIdToProduitInfo',
  standalone: true
})
export class ProduitIdToProduitInfoPipe implements PipeTransform {

  transform(produit_id: number, produits: any[], showNom: boolean = true, showQuantite: boolean = true, showPrixU: boolean = true, showCategorie: boolean = true, showImage: boolean = true): string {
    const produit = produits.find(p => p.id === produit_id);
    if (produit) {
      let info = '';
      if (showNom) {
        info += produit.nomproduit;
      }
      if (showQuantite) {
        info += (info ? ' - ' : '') + produit.quantite;
      }
      if (showPrixU) {
        info += (info ? ' - ' : '') + produit.prixU;
      }if(showCategorie){
        info += (info ? ' - ' : '') + produit.categorie_id;
      }if(showImage){
        info += (info ? ' - ' : '') + produit.image;
      }
      return info || 'N/A';
    } else {
      return 'N/A';
    }
  }

}
