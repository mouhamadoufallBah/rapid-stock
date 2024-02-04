import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { api } from '../../shared/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) { }

  addProduct(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.post<any>(`${api}/produit/create`, data, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null);
  }

  getAllProduct(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.get<any>(`${api}/produits/lister`, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null);
  }

  getProductById(id: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.get<any>(`${api}/produit/detail/${id}`, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null);
  }

  getProductByIdCategorie(id: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.get<any>(`${api}/produit/${id}`, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null);
  }

  updateProduct(id: number, data: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.put<any>(`${api}/produit/edit/${id}`, data, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null);
  }

  deleteProduct(id: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.delete<any>(`${api}/produit/supprimer/${id}`, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null);
  }

}
