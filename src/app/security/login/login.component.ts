import { Component } from '@angular/core';
import { AuthService } from '../../services/users/auth.service';
import Notiflix from 'notiflix';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  regexEmail = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$');

  constructor(private authService: AuthService,private route: Router) { }

  clearInput(){
    this.email = "";
    this.password = "";
  }

  onLogin() {
    if (this.email == "" || this.password == "") {
      Notiflix.Notify.failure('Veuillez remplir les champs');
    } else {
      Notiflix.Loading.init({
        svgColor:'#f47a20',
      });
      Notiflix.Loading.hourglass();

      this.authService.login(this.email, this.password).subscribe(
        (data) => {
          // console.log(data)
          if (data.user) {

            this.clearInput();

            localStorage.setItem("userOnline", JSON.stringify(data.user));
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
