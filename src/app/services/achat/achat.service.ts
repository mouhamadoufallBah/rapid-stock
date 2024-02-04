import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { api } from '../../shared/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AchatService {

  constructor(private http: HttpClient) { }

  addAchat(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.post<any>(`${api}/achat/create`, data, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null);
  }

  getAllAchat(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.get<any>(`${api}/achat/lister`, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null);
  }

  getAchatById(id: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.get<any>(`${api}/achat/detail/${id}`, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null);
  }

  updateAchat(id: number, data: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.put<any>(`${api}/achat/edit/${id}`, data, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null);
  }

  deleteAchat(id: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.delete<any>(`${api}/achat/supprimer/${id}`, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null);
  }
}
