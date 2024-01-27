import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../shared/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) { }

  addProduct(data: any): Observable<any> {
    return this.http.post<any>(`${api}/produit/create`, data);
  }

  getAllProduct(): Observable<any> {
    return this.http.get<any>(`${api}/produit/lister`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${api}/produit/detail/${id}`);
  }

  updateProduct(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${api}/produit/edit/${id}`, data);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${api}/produit/supprimer/${id}`);
  }

}
