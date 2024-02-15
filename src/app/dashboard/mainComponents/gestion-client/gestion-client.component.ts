import { Component, OnInit } from '@angular/core';
import { DatatableService } from '../../../services/datatable.service';
import { DataTablesModule } from 'angular-datatables';
import Notiflix from 'notiflix';
import { ClientService } from '../../../services/client/client.service';
import { FormsModule } from '@angular/forms';
import { Client } from '../../../models/client'

@Component({
  selector: 'app-gestion-client',
  standalone: true,
  imports: [DataTablesModule, FormsModule],
  templateUrl: './gestion-client.component.html',
  styleUrl: './gestion-client.component.scss'
})
export class GestionClientComponent implements OnInit {
  clients : Client[] = [];
  selectedClient: any;
  newCode_client: string = "";

  nomAdd: string = "";
  prenomAdd: string = "";
  telephoneAdd: string = "";
  adresseAdd: string = "";

  nomUpdate: string = "";
  prenomUpdate: string = "";
  telephoneUpdate: string = "";
  adresseUpdate: string = "";

  dtOptions: DataTables.Settings = {};

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.dtOptions = {
      searching: true,
      lengthChange: false,
      paging: true,
      info: false,
      pageLength: 9,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json',
      },
      autoWidth: true,
    };

    this.getAllClients();
  }

  getAllClients() {
    Notiflix.Loading.init({
      svgColor: '#f47a20',
      cssAnimation: true,
      cssAnimationDuration: 360,
    });

    Notiflix.Loading.hourglass();

    this.clientService.getAllClient().subscribe(
      (data: any) => {
        this.clients = data.data;

        Notiflix.Loading.remove();
      },
      (error) => {
        console.error('Erreur lors de la récupération des clients', error);
      }
    );
  }

  onAddClient() {
    if(this.clients.length > 0){
      const lastCodeClient = this.clients[this.clients.length - 1].code_client.slice(2);
      let nombre = parseInt(lastCodeClient);
      nombre++;
      this.newCode_client = `C${nombre.toString().padStart(5, '0')}`;
    }else{
      this.newCode_client =  'C00001';
    }


    const data: any = {
      nom: this.nomAdd,
      prenom: this.prenomAdd,
      code_client: this.newCode_client,
      telephone: `+221${this.telephoneAdd}`,
      adresse: this.adresseAdd
    };

    if (this.nomAdd === "", this.prenomAdd === "", this.telephoneAdd === "", this.adresseAdd === "") {
      Notiflix.Notify.failure('Veuillez remplir le champs');
    } else {
      Notiflix.Loading.init({
        svgColor: '#f47a20',
        cssAnimation: true,
        cssAnimationDuration: 360,

      });
      Notiflix.Loading.hourglass();
      this.clientService.addClient(data).subscribe(
        () => {
          Notiflix.Notify.init({
            cssAnimation: true,
            cssAnimationDuration: 360,
            cssAnimationStyle: 'zoom',
          });

          Notiflix.Notify.success('Client ajoutée avec succès');
          this.getAllClients();
          console.log(this.clients);

          Notiflix.Loading.remove();
          this.nomAdd = "";
          this.prenomAdd = "";
          this.telephoneAdd = "";
          this.adresseAdd = "";
        },
        (error) => {
          console.error('Erreur lors de l\'ajout du client', error);
          Notiflix.Report.failure('Une erreur s\'est produite lors de l\'ajout du client', '', 'Okay');
          Notiflix.Loading.remove();
        }
      );
    }
  }

  onSelectedClient(id: number) {
    this.selectedClient = this.clients.find((category: any) => category.id === id);
    if (this.selectedClient) {
      ({
        nom: this.nomUpdate,
        prenom: this.prenomUpdate,
        telephone: this.telephoneUpdate,
        adresse: this.adresseUpdate
      } = this.selectedClient);
    }
  }

  onUpdateClient(id: number) {
    const data = {
      nom: this.nomUpdate,
      prenom: this.prenomUpdate,
      code_client: this.selectedClient.code_client,
      telephone: this.telephoneUpdate,
      adresse: this.adresseUpdate
    };

    // Combine multiple conditions for conciseness
    if (!data.nom || !data.prenom || !data.telephone || !data.adresse) {
      Notiflix.Notify.failure('Veuillez remplir tous les champs');
      return;
    }

    //update
    Notiflix.Loading.hourglass(); // Show loading indicator directly
    this.clientService.updateClient(data, id).subscribe({
      next: () => {
        Notiflix.Notify.success('Client modifié avec succès');
        this.getAllClients();
        Notiflix.Loading.remove();
      },
      error: (error) => {
        console.error('Erreur lors de la modification du client', error);
        Notiflix.Report.failure('Une erreur s\'est produite lors de la modification du client', '', 'Okay');
        Notiflix.Loading.remove();
      }
    });
  }

  onDeleteClient(id: number) {
    Notiflix.Confirm.init({
      okButtonBackground: '#FF1700',
      titleColor: '#FF1700'
    });
    Notiflix.Confirm.show(
      'Attention',
      'Voulez-vous supprimer cette client?',
      'Oui',
      'Non',
      () => {
        Notiflix.Loading.init({
          svgColor: '#f47a20',
        });
        Notiflix.Loading.hourglass();

        this.clientService.deleteClient(id).subscribe(
          (response) => {
            Notiflix.Loading.remove();
            Notiflix.Notify.success('Client supprimée avec succès');
            this.getAllClients();
          },
          (error) => {
            // Une erreur s'est produite lors de la suppression de la catégorie
            console.error('Erreur lors de la suppression du client', error);
            Notiflix.Report.failure('Une erreur s\'est produite lors de la suppression du client', '', 'Okay');
          }
        );
      },
      () => { },
      {},
    );

  }
}
