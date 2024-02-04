import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientIdToClientInfo',
  standalone: true
})
export class ClientIdToClientInfoPipe implements PipeTransform {

  transform(client_id: number, clients: any[], showName: boolean = false, showLastName: boolean = false, showPhoneNumber: boolean = false, showAddress: boolean = false): string {
    const client = clients.find(c => c.id === client_id);
    if (client) {
      let info = '';
      if (showName) {
        info += client.nom;
      }
      if (showLastName) {
        info += (info ? ' ' : '') + client.prenom;
      }
      if (showPhoneNumber) {
        info += (info ? ' - ' : '') + client.telephone;
      }
      if (showAddress) {
        info += (info ? ' - ' : '') + client.adresse;
      }
      return info || 'N/A';
    } else {
      return 'N/A';
    }
  }

}
