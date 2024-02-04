import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'venteIdToVenteInfo',
  standalone: true
})
export class VenteIdToVenteInfoPipe implements PipeTransform {

  transform(vente_id: number, vente: any[]): string {
    const v = vente.find(item => item.id === vente_id);
    return v ? v.montant_total : 'N/A';
  }

}
