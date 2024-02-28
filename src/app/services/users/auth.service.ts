import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of, tap } from 'rxjs'
import { api } from '../../shared/apiUrl';
import { Cacheable, LocalStorageStrategy } from 'ts-cacheable';
import Swal from 'sweetalert2';

const cacheBuster$ = new Subject<void>();
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  addEmploye(data: string): Observable<any> {
    return this.http.post<any>(`${api}/register`, data).pipe(tap(() => cacheBuster$.next()));
  }

  // @Cacheable({storageStrategy: LocalStorageStrategy, maxAge: 60*60*1000})
  login(email: string, password: string): Observable<any> {
    const data = { email, password };
    return this.http.post<any>(`${api}/login`, data);
  }

  checkPassWord(data: any){
    const accessToken = localStorage.getItem('access_token');

    return accessToken ? this.http.post<any>(`${api}/employe/edit/passwordHash`, data, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
    }) : of(null);
  }

  updateEmploye(data: any, id: number): Observable<any> {
      const accessToken = localStorage.getItem('access_token');

      return accessToken ?
        this.http.put<any>(`${api}/employe/edit/${id}`, data, {
          headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
        }).pipe(tap(() => cacheBuster$.next())) :
        of(null);

  }

  @Cacheable({cacheBusterObserver: cacheBuster$})
  getAllEmploye(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.get<any>(`${api}/employe/lister`, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null);
  }

  getEmployeById(id: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.get<any>(`${api}/employe/detail/${id}`, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null);

  }

  activeDeactiveEmploye(id: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ? this.http.put<any>(`${api}/employe/archive/${id}`, {}, {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
    }).pipe(tap(() => cacheBuster$.next()))  : of(null);
  }


  deconnexionAutomatique() {
    setTimeout(() => {
      this.refreshToken(this.onSuccess, this.onError);
    }, 10000); // 10 secondes
  }


refreshToken(onSuccess: Function, onError: Function) {
    // Vérifier si le nombre de rafraîchissements a atteint la limite de 4
    const refreshCount = parseInt(
      localStorage.getItem('refreshCount') || '0'
    );

    if (refreshCount >= 4) {
      // Afficher SweetAlert pour proposer de rafraîchir le token ou se déconnecter
      this.showLogoutAlert();
    } else {
      // Mettre à jour le nombre de rafraîchissements dans le localStorage
      localStorage.setItem('refreshCount', (refreshCount + 1).toString());
      // Réinitialiser le timer de déconnexion automatique
      this.deconnexionAutomatique();
    }

    // Effectuer le rafraîchissement du token
    return this.http.post<any>(`${api}/refresh`, '').subscribe(
      (response: any) => onSuccess(response),
      (error: any) => onError(error)
    );
  }

onSuccess = (response: any) => {
    // Mettre à jour le token
    localStorage.setItem('access_token', response);
    console.log('voici la reponse du changement du token', response);
  };

  onError = (error: any) => {
    console.log('Voici les erreurs du changement du token', error);
  };

showLogoutAlert() {
    let refresh = 0;
    localStorage.setItem('refreshCount', JSON.stringify(refresh));
    this.logout();

    // this.MessageSucces()
    Swal.fire({
      title: 'Votre Session a expirer',
      text: 'Deconnecter vous ou rafraichissez votre token',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui! je raffraichie',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'non!',
          text: 'non!, je me deconnecte',
          icon: 'success',
        });
      }
    });
  }


   logout(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
console.log(accessToken);

    return accessToken ?
      this.http.post<any>(`${api}/logout`, {}, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null);
  }
}
