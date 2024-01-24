import { Component, OnInit } from '@angular/core';
import { DatatableService } from '../../../services/datatable.service';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-gestion-accompte',
  standalone: true,
  imports: [DataTablesModule],
  templateUrl: './gestion-accompte.component.html',
  styleUrl: './gestion-accompte.component.scss'
})
export class GestionAccompteComponent implements OnInit{

  acomptes = [
    {
      id: 1,
      nomClient: "Dupont",
      prenomClient: "Jean",
      adresseClient: "123 Rue de l'Entreprise",
      telephoneClient: "0123456789",
      date: "2022-01-18",
      montantTotal: 1000,
      versements: [
        { id: 1, date: "2022-01-20", montantVerse: 300 },
        { id: 2, date: "2022-02-05", montantVerse: 500 },
      ],
    },
    {
      id: 1,
      nomClient: "Dupont",
      prenomClient: "Jean",
      adresseClient: "123 Rue de l'Entreprise",
      telephoneClient: "0123456789",
      date: "2022-01-18",
      montantTotal: 1000,
      versements: [
        { id: 1, date: "2022-01-20", montantVerse: 300 },
        { id: 2, date: "2022-02-05", montantVerse: 500 },
      ],
    },
    {
      id: 1,
      nomClient: "Dupont",
      prenomClient: "Jean",
      adresseClient: "123 Rue de l'Entreprise",
      telephoneClient: "0123456789",
      date: "2022-01-18",
      montantTotal: 1000,
      versements: [
        { id: 1, date: "2022-01-20", montantVerse: 300 },
        { id: 2, date: "2022-02-05", montantVerse: 500 },
      ],
    },
    {
      id: 1,
      nomClient: "Dupont",
      prenomClient: "Jean",
      adresseClient: "123 Rue de l'Entreprise",
      telephoneClient: "0123456789",
      date: "2022-01-18",
      montantTotal: 1000,
      versements: [
        { id: 1, date: "2022-01-20", montantVerse: 300 },
        { id: 2, date: "2022-02-05", montantVerse: 500 },
      ],
    },
    {
      id: 1,
      nomClient: "Dupont",
      prenomClient: "Jean",
      adresseClient: "123 Rue de l'Entreprise",
      telephoneClient: "0123456789",
      date: "2022-01-18",
      montantTotal: 1000,
      versements: [
        { id: 1, date: "2022-01-20", montantVerse: 300 },
        { id: 2, date: "2022-02-05", montantVerse: 500 },
      ],
    },
  ]

  dtOptions: DataTables.Settings = {};

  constructor(private dt: DatatableService){}

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
  }
}
