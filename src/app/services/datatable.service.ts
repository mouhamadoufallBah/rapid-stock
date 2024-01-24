import { Injectable } from '@angular/core';

import { DataTablesModule } from 'angular-datatables';

@Injectable({
  providedIn: 'root'
})
export class DatatableService {

  initTable(config: any){
    config = {
      searching: true,
      lengthChange: false,
      paging: true,
      info: false,
      pageLength: 9,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',
      }
    };
  }
}
