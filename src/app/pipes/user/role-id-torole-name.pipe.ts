import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleIdToroleName',
  standalone: true
})
export class RoleIdToroleNamePipe implements PipeTransform {

  transform(role_id: number, roles: any[]): string {
    const role = roles.find(role => role.id === role_id);
    return role ? role.nom : 'N/A';
  }

}
