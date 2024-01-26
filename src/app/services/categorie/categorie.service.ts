import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/category';
import { api } from '../../shared/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http: HttpClient) { }

  getAllCategory(): Observable<any[]> {
    return this.http.get<any[]>(`${api}/categorie/lister`)
  }

  addCategory(data: any): Observable<any> {
    return this.http.post<Category>(`${api}/categorie/create`, data);
  }

  updateCategory(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${api}/categorie/edit/${id}`, data);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${api}/categorie/supprimer/${id}`);
  }
}
