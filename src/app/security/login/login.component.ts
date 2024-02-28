import { Component } from '@angular/core';
import { AuthService } from '../../services/users/auth.service';
import Notiflix from 'notiflix';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptionService } from '../../services/encryption.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = "";
  password: string = "";

  exactEmail: boolean;
  verifEmail: string = "";

  exactPassword: boolean;
  verifPassword: string = "";


  constructor(private authService: AuthService, private route: Router, private encryptionService: EncryptionService) { }

  clearInput() {
    this.email = "";
    this.password = "";
  }


  validateEmail(email: string): boolean {
    const emailRegex = /^[A-Za-z]+[A-Za-z0-9._%+-]+@+[A-Za-z][A-Za-z0-9.-]+.[A-Za-z]{2,}$/;

    return emailRegex.test(email);
  }

  verifiEmail() {
    if (this.email == '') {
      this.verifEmail = '';
    } else {
      if (this.validateEmail(this.email) == true) {
        this.exactEmail = true;
        this.verifEmail = '';
      }

      if (this.validateEmail(this.email) == false) {
        this.exactEmail = false;
        this.verifEmail = 'le format du mail est invalide';
      }
    }
  }

  verifPasswordFonction() {
    this.exactPassword = false;
    if (this.password == '') {
      this.verifPassword = 'Veuillez renseigner votre mot de passe';
    } else if (this.password.length < 8) {
      this.verifPassword = 'Mot de passe doit être supérieur ou égal à 8';
    } else if (this.password.includes(' ')) {
      this.verifPassword = "Le mot de passe ne peut pas contenir d'espace";
    } else {
      this.verifPassword = '';
      this.exactPassword = true;
    }
    if (this.password == '') {
      this.verifPassword = '';
    }
  }

  onLogin() {
    if (!this.validateEmail(this.email) || this.password == "") {
      Notiflix.Notify.failure('Veuillez remplir les champs');
    } else {
      Notiflix.Loading.init({
        svgColor: '#f47a20',
      });
      Notiflix.Loading.hourglass();

      this.authService.login(this.email, this.password).subscribe(
        (data) => {
          // this.authService.deconnexionAutomatique();

          // console.log(data)
          if (data.user) {

            this.clearInput();

            const userOnline = this.encryptionService.encryptionAES(JSON.stringify(data.user));
            localStorage.setItem('userOnline', userOnline);

            localStorage.setItem("access_token", JSON.stringify(data.access_token).replace(/['"]+/g, ''));

            this.route.navigate(['/dashboard'])

            Notiflix.Loading.remove();

            Notiflix.Notify.success('Connexion avec succées');

          } else {
            Notiflix.Notify.failure('Email ou mot de passe incorrecte');
          }
        }, (error) => {
          console.error('Erreur lors de la connexion', error);

          Notiflix.Loading.remove();

          if (error.status === 401) {
            Notiflix.Notify.failure('Erreur d\'authentification');
          } else {
            Notiflix.Report.failure('Erreur inattendue', 'Une erreur s\'est produite lors de la connexion', 'Okay');
          }
        }
      );

    }
  }
}
