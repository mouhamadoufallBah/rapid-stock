import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userIdToUserInfo',
  standalone: true
})
export class UserIdToUserInfoPipe implements PipeTransform {

  transform(user_id: number, users: any[], showName: boolean = false, showLastName: boolean = false, showPhoneNumber: boolean = false, showAddress: boolean = false): string {
    const user = users.find(c => c.id === user_id);
    // console.log(users);

    if (user) {
      let info = '';
      if (showName) {
        info += user.nom;
      }
      if (showLastName) {
        info += (info ? ' ' : '') + user.prenom;
      }
      if (showPhoneNumber) {
        info += (info ? ' - ' : '') + user.telephone;
      }
      if (showAddress) {
        info += (info ? ' - ' : '') + user.adresse;
      }
      return info || 'N/A';
    } else {
      return 'Propriétaire';
    }
  }

}
