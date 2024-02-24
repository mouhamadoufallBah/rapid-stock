import { Component, OnInit } from '@angular/core';
import { EncryptionService } from '../../../services/encryption.service';
import { FormsModule, NgModel } from '@angular/forms';
import Notiflix from 'notiflix';
import { AuthService } from '../../../services/users/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  prenom: string = "";
  nom: string = "";
  telephone: string = "";
  adresse: string = "";

  exactPrenom: boolean;
  verifPrenom: string = "";

  exactNom: boolean;
  verifNom: string = "";

  exactTelephone: boolean;
  verifTelephone: string = "";

  exactAdresse: boolean;
  verifAdresse: string = "";

  password: string = "";
  newPassword: string = "";
  confirmPassword: string = "";

  

  constructor(private encryptionService: EncryptionService, private authService: AuthService) { }

  currentUser: any;

  ngOnInit(): void {
    this.currentUser = JSON.parse(this.encryptionService.decryptionAES(localStorage.getItem('userOnline')));

    ({
      prenom: this.prenom,
      nom: this.nom,
      telephone: this.telephone,
      adresse: this.adresse
    } = this.currentUser);
  }

  validateNomPrenom(text: string): boolean {
    const prenomNomRegex = /^[A-Za-z]{2,}(?: [A-Za-z]{2,})*$/;

    return prenomNomRegex.test(text);
  }

  verifiNom() {
    const nom = this.nom.trim();

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
    const Prenom = this.prenom.trim();

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

  validateTel(telephone: string): boolean {
    const phoneRegex = /^\+221(77|78|70|76)[0-9]{7}$/;

    return phoneRegex.test(telephone);
  }


  verifiAdresse() {
    const Adresse = this.adresse.trim();

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
    if (this.telephone == '') {
      this.verifTelephone = '';
    } else {
      if (this.validateTel(this.telephone) == true) {
        this.exactTelephone = true;
        this.verifTelephone = '';
      }

      if (this.validateTel(this.telephone) == false) {
        this.exactTelephone = false;
        this.verifTelephone = 'le format du numéro doit commencer par 77/78/70/76 plus 7 chiffres';
      }
    }
  }

  onUpdateProfile() {
    if (this.nom == "" || this.prenom == "" || this.telephone == "" || this.adresse == "") {
      Notiflix.Notify.failure('Veuillez remplir le champs');
    } else {
      const data = {
        prenom: this.prenom,
        nom: this.nom,
        email: this.currentUser.email,
        telephone: this.telephone,
        adresse: this.adresse,
        etat: this.currentUser.etat,
        role_id: this.currentUser.role_id
      }

      Notiflix.Loading.init({
        svgColor: '#f47a20',
        cssAnimation: true,
        cssAnimationDuration: 360,
      });
      Notiflix.Loading.hourglass();

      this.authService.updateEmploye(data, this.currentUser.id).subscribe(
        (response) => {
          Notiflix.Notify.success('Information modifier avec succès');
          Notiflix.Loading.remove();
          const userOnline = this.encryptionService.encryptionAES(JSON.stringify(response.user));
          localStorage.setItem('userOnline', userOnline);

          this.currentUser = JSON.parse(this.encryptionService.decryptionAES(localStorage.getItem('userOnline')));

        }
      )
    }
  }

  onUpdatePassword() {
    if (this.password == "" || this.newPassword == "" || this.confirmPassword == "") {
      Notiflix.Notify.failure('Veuillez remplir le champs');
    } else {
      const data = {
        password: this.password
      }
      this.authService.checkPassWord(data).subscribe(
        (response) => {
          if (response.status_code == 200) {
            if (this.newPassword != this.confirmPassword) {
              Notiflix.Notify.failure('Le nouveau mot de passe et la confirmation de mot de passe ne doit pas être différent');
            } else {
              const data = {
                prenom: this.currentUser.prenom,
                nom: this.currentUser.nom,
                email: this.currentUser.email,
                telephone: this.currentUser.telephone,
                adresse: this.currentUser.adresse,
                password: this.newPassword,
                etat: this.currentUser.etat,
                role_id: this.currentUser.role_id
              }
              Notiflix.Loading.init({
                svgColor: '#f47a20',
                cssAnimation: true,
                cssAnimationDuration: 360,
              });
              Notiflix.Loading.hourglass();
              this.authService.updateEmploye(data, this.currentUser.id).subscribe(
                (response) => {
                  Notiflix.Notify.success('Mot de passe modifier avec succès');
                  Notiflix.Loading.remove();
                  const userOnline = this.encryptionService.encryptionAES(JSON.stringify(response.user));
                  localStorage.setItem('userOnline', userOnline);
                  this.currentUser = JSON.parse(this.encryptionService.decryptionAES(localStorage.getItem('userOnline')));

                  this.password = "";
                  this.newPassword = "";
                  this.confirmPassword = "";

                }
              )
            }
          } else {
            Notiflix.Notify.failure(response.Message);
          }
        }
      )

    }
  }

}
