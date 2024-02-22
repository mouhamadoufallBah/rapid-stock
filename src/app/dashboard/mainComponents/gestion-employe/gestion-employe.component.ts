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

  exactPrenom: boolean;
  verifPrenom: string = "";

  exactNom: boolean;
  verifNom: string = "";

  exactEmail: boolean;
  verifEmail: string = "";

  exactTelephone: boolean;
  verifTelephone: string = "";

  exactAdresse: boolean;
  verifAdresse: string = "";

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

  validateNomPrenom(text: string): boolean {
    const prenomNomRegex = /^[A-Za-z]{2,}(?: [A-Za-z]{2,})*$/;

    return prenomNomRegex.test(text);
  }

  verifiNom() {
    const nom = this.nomAdd.trim(); // Appliquer trim()

    if (nom === '') {
      this.verifNom = '';
      this.exactNom = false;
    } else if (
      this.validateNomPrenom(nom) &&
      nom.length >= 2
    ) {
      this.exactNom = true;
      this.verifNom = '';
    } else if (nom.length < 2) {
      this.exactNom = false;
      this.verifNom = 'au minimum avoir deux caractères ';
    } else {
      this.exactNom = false;
      this.verifNom = 'le nom est invalide ';
    }
  }

  verifiPrenom() {
    const Prenom = this.prenomAdd.trim();

    if (Prenom === '') {
      this.verifPrenom = '';
      this.exactPrenom = false;
    } else if (
      this.validateNomPrenom(Prenom) &&
      Prenom.length >= 2
    ) {
      this.exactPrenom = true;
      this.verifPrenom = '';
    } else if (Prenom.length < 2) {
      this.exactPrenom = false;
      this.verifPrenom = 'au minimum avoir deux caractères ';
    } else {
      this.exactPrenom = false;
      this.verifPrenom = 'le Prenom est invalide ';
    }
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[A-Za-z]+[A-Za-z0-9._%+-]+@[A-Za-z][A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

    return emailRegex.test(email);
  }

  verifiEmail() {
    if (this.emailAdd == '') {
      this.verifEmail = '';
    } else {
      if (this.validateEmail(this.emailAdd) == true) {
        this.exactEmail = true;
        this.verifEmail = '';
      }

      if (this.validateEmail(this.emailAdd) == false) {
        this.exactEmail = false;
        this.verifEmail = 'le format du mail est invalide';
      }
    }
  }

  validateTel(telephone: string): boolean {
    const phoneRegex = /^(77|78|76|70|75|33)[0-9]{7}$/;

    return phoneRegex.test(telephone);
  }


  verifiAdresse() {
    const Adresse = this.adresseAdd.trim();

    if (Adresse === '') {
      this.verifAdresse = '';
      this.exactAdresse = false;
    } else if (
      this.validateNomPrenom(Adresse) &&
      Adresse.length >= 2
    ) {
      this.exactAdresse = true;
      this.verifAdresse = '';
    } else if (Adresse.length < 2) {
      this.exactAdresse = false;
      this.verifAdresse = 'au minimum avoir deux caractères ';
    } else {
      this.exactPrenom = false;
      this.verifPrenom = 'le Adresse est invalide ';
    }
  }

  verifiTel() {
    if (this.telephoneAdd == '') {
      this.verifTelephone = '';
    } else {
      if (this.validateTel(this.telephoneAdd) == true) {
        this.exactTelephone = true;
        this.verifTelephone = '';
      }

      if (this.validateTel(this.telephoneAdd) == false) {
        this.exactTelephone = false;
        this.verifTelephone = 'le format du numéro doit commencer par 77/78/70/76 plus 7 chiffres';
      }
    }
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
      Notiflix.Notify.failure('Veuillez remplir le champs');
    } else {
      Notiflix.Loading.init({
        svgColor: '#f47a20',
        cssAnimation: true,
        cssAnimationDuration: 360,

      });
      Notiflix.Loading.hourglass();
      this.authService.addEmploye(data).subscribe(
        () => {
          Notiflix.Notify.init({
            cssAnimation: true,
            cssAnimationDuration: 360,
            cssAnimationStyle: 'zoom',
          });

          Notiflix.Notify.success('Employé ajoutée avec succès');
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
