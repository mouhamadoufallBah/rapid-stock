import { Component } from '@angular/core';
import { DatatableService } from '../../../services/datatable.service';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-gestion-client',
  standalone: true,
  imports: [DataTablesModule],
  templateUrl: './gestion-client.component.html',
  styleUrl: './gestion-client.component.scss'
})
export class GestionClientComponent {
  dbEmployes = [
    { id: 1, nom: "Dupont", prenom: "Jean", email: "jean.dupont@email.com", telephone: "0123456789", adresse: "123 Rue de l'Entreprise", etat: "Actif" },
    { id: 2, nom: "Martin", prenom: "Sophie", email: "sophie.martin@email.com", telephone: "0987654321", adresse: "456 Avenue du Travail", etat: "Inactif" },
    { id: 3, nom: "Tremblay", prenom: "Pierre", email: "pierre.tremblay@email.com", telephone: "0123456789", adresse: "789 Boulevard de la Compagnie", etat: "Actif" },
    { id: 4, nom: "Lavoie", prenom: "Isabelle", email: "isabelle.lavoie@email.com", telephone: "0987654321", adresse: "101 Rue de l'Industrie", etat: "Actif" },
    { id: 5, nom: "Gagnon", prenom: "Marc", email: "marc.gagnon@email.com", telephone: "0123456789", adresse: "202 Avenue de la Société", etat: "Inactif" },
    { id: 6, nom: "Leclerc", prenom: "Marie", email: "marie.leclerc@email.com", telephone: "0987654321", adresse: "303 Boulevard des Employés", etat: "Actif" },
    { id: 7, nom: "Roy", prenom: "Philippe", email: "philippe.roy@email.com", telephone: "0123456789", adresse: "404 Rue du Bureau", etat: "Actif" },
    { id: 8, nom: "Fortin", prenom: "Nathalie", email: "nathalie.fortin@email.com", telephone: "0987654321", adresse: "505 Avenue des Collègues", etat: "Inactif" },
    { id: 9, nom: "Bergeron", prenom: "Robert", email: "robert.bergeron@email.com", telephone: "0123456789", adresse: "606 Boulevard de la Direction", etat: "Actif" },
    { id: 10, nom: "Lévesque", prenom: "Catherine", email: "catherine.levesque@email.com", telephone: "0987654321", adresse: "707 Rue du Personnel", etat: "Actif" },
    { id: 11, nom: "Caron", prenom: "François", email: "francois.caron@email.com", telephone: "0123456789", adresse: "808 Avenue de la Gestion", etat: "Inactif" },
    { id: 12, nom: "Gauthier", prenom: "Annie", email: "annie.gauthier@email.com", telephone: "0987654321", adresse: "909 Boulevard des Ressources", etat: "Actif" },
    { id: 13, nom: "Dubé", prenom: "Mathieu", email: "mathieu.dube@email.com", telephone: "0123456789", adresse: "111 Rue de l'Administration", etat: "Actif" },
    { id: 14, nom: "Côté", prenom: "Mélanie", email: "melanie.cote@email.com", telephone: "0987654321", adresse: "222 Avenue des Collaborateurs", etat: "Inactif" },
    { id: 15, nom: "Rousseau", prenom: "Julie", email: "julie.rousseau@email.com", telephone: "0123456789", adresse: "333 Boulevard du Personnel", etat: "Actif" }
  ];

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
