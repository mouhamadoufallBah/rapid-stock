import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { api } from '../../shared/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  constructor(private http: HttpClient) { }

  addPaiement(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.post<any>(`${api}/payement/create`, data, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null);
  }
}
