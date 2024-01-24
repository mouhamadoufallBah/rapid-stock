import { Component } from '@angular/core';
import { DatatableService } from '../../../services/datatable.service';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-gestion-achat',
  standalone: true,
  imports: [DataTablesModule, FormsModule, NgIf],
  templateUrl: './gestion-achat.component.html',
  styleUrl: './gestion-achat.component.scss'
})
export class GestionAchatComponent {
  editValue: boolean = false;

  dtOptions: DataTables.Settings = {};
  panier: DataTables.Settings = {};


  constructor(private dt: DatatableService) { }

  ngOnInit(): void {
    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      info: false,
      pageLength: 9,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',
      }
    };

    this.panier = {
      searching: false,
      lengthChange: false,
      paging: true,
      info: false,
      pageLength: 5,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',
      }
    };
  }

  onEdit() {
    this.editValue = !this.editValue;
  }

  onClickEnter(): void {
    this.saveChanges();

  }

  saveChanges(): void {
    this.editValue = false;
  }
}
