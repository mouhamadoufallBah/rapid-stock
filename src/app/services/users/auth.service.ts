import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { api } from '../../shared/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private http: HttpClient) {}

  login(email: string, motDePasse: string): Observable<any> {
    const data = {
      email: email,
      password: motDePasse
    };

    return this.http.post<any>(`${api}/login`, data);
  }


  logout(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      // Ajouter le token d'accès aux en-têtes
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${accessToken}`
      });

      console.log(headers)
      return this.http.post(`${api}/logout`, {}, { headers });
    } else {
      console.error('Token d\'accès introuvable lors de la déconnexion');
      return new Observable();
    }


  }

}
