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

  addCategory(nom: string): Observable<any> {
    const data = {
      nom: nom
    };

    return this.http.post<Category>(`${api}/categorie/create`, data);
  }

  updateCategory(nom: string, id: number): Observable<any> {
    const data: any = {
      nom: nom
    };

    return this.http.put<any>(`${api}/categorie/edit/${id}`, data);
  }


  deleteCategorie(id: number): Observable<any> {
    return this.http.delete(`${api}/categorie/supprimer/${id}`);
  }
}
