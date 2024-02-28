import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of, tap } from 'rxjs';
import { Category } from '../../models/category';
import { api } from '../../shared/apiUrl';
import { Cacheable } from 'ts-cacheable';

const cacheBuster$ = new Subject<void>();

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http: HttpClient) { }

  @Cacheable({cacheBusterObserver: cacheBuster$})
  getAllCategory(): Observable<any> {

    return this.http.get<any>(`${api}/categorie/lister`)
  }

  addCategory(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.post<Category>(`${api}/categorie/create`, data, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }).pipe(tap(() => cacheBuster$.next())) :
      of(null);
  }

  updateCategory(data: any, id: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.put<any>(`${api}/categorie/edit/${id}`, data, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }).pipe(tap(() => cacheBuster$.next())) :
      of(null);
  }

  deleteCategory(id: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.delete(`${api}/categorie/supprimer/${id}`, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }).pipe(tap(() => cacheBuster$.next())) :
      of(null);
  }
}
