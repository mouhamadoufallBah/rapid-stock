import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';
import { DatatableService } from '../../../services/datatable.service';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../../../services/users/auth.service';
import Notiflix from 'notiflix';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-employe',
  standalone: true,
  imports: [DataTablesModule, FormsModule, NgIf, NgClass],
  templateUrl: './gestion-employe.component.html',
  styleUrl: './gestion-employe.component.scss'
})
export class GestionEmployeComponent implements OnInit{
  employe = [];
  selectedEmploye : any;


  nomAdd: string = "";
  prenomAdd: string = "";
  emailAdd: string = "";
  telephoneAdd: string = "";
  adresseAdd: string = "";

  nomUpdate: string = "";
  prenomUpdate: string = "";
  emailUpdate: string = "";
  telephoneUpdate: string = "";
  adresseUpdate: string = "";

  dtOptions: DataTables.Settings = {};

  constructor(private authService: AuthService){}

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

    this.getAllEmploye();
  }


  getAllEmploye(){
    Notiflix.Loading.init({
      svgColor: '#f47a20',
      cssAnimation: true,
      cssAnimationDuration: 360,
    });

    Notiflix.Loading.hourglass();
    this.authService.getAllEmploye().subscribe(
      (data: any) =>{
        this.employe = data.data;
        console.log(this.employe);

        Notiflix.Loading.remove();
      },
      (error) => {
        console.error('Erreur lors de la récupération des employée', error);
      }
    )
  }

  onAddEmploye() {
    const data: any = {
      nom: this.nomAdd,
      prenom: this.prenomAdd,
      email: this.emailAdd,
      password: "passer@123",
      telephone: `+221${this.telephoneAdd}`,
      etat: "actif",
      adresse: this.adresseAdd,
      role_id: 2
    };

    if (!this.nomAdd || !this.prenomAdd || !this.telephoneAdd || !this.adresseAdd || !this.emailAdd) {
      Notiflix.Report.failure('Veuillez remplir le champs', '', 'Okay');
    } else {
      Notiflix.Loading.init({
        svgColor: '#f47a20',
        cssAnimation: true,
        cssAnimationDuration: 360,

      });
      Notiflix.Loading.hourglass();
      this.authService.addEmploye(data).subscribe(
        () => {
          Notiflix.Report.init({
            cssAnimation: true,
            cssAnimationDuration: 360,
            cssAnimationStyle: 'zoom',
          });

          Notiflix.Report.success('Employé ajoutée avec succès', '', 'Okay');
          this.getAllEmploye();
          console.log(this.employe);

          Notiflix.Loading.remove();
          this.nomAdd = "";
          this.prenomAdd = "";
          this.emailAdd = "";
          this.telephoneAdd = "";
          this.adresseAdd = "";
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'employé', error);
          Notiflix.Report.failure('Une erreur s\'est produite lors de l\'ajout de l\'employé', '', 'Okay');
          Notiflix.Loading.remove();
        }
      );
    }
  }

  getEmployeById(id: number){
    this.authService.getEmployeById(id).subscribe(
      (data) => {
        this.selectedEmploye = data;
      }
    )
  }

  onActiveDeactiveEmploye(id: number){
    this.authService.activeDeactiveEmploye(id).subscribe(
      (data) => {
        console.log(data)
        this.getAllEmploye();
      }
    )
  }


}
