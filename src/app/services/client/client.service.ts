import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of, tap } from 'rxjs';
import { api } from '../../shared/apiUrl';
import { Cacheable } from 'ts-cacheable';

const cacheBuster$ = new Subject<void>();

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  @Cacheable({cacheBusterObserver: cacheBuster$})
  getAllClient(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.get<any>(`${api}/client/lister`, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null);
  }

  addClient(data: string): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.post<any>(`${api}/client/create`, data, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }).pipe(tap(() => cacheBuster$.next())) :
      of(null);
  }

  updateClient(data: any, id: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.put<any>(`${api}/client/edit/${id}`, data, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }).pipe(tap(() => cacheBuster$.next())) :
      of(null);
  }

  deleteClient(id: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.delete(`${api}/client/supprimer/${id}`, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }).pipe(tap(() => cacheBuster$.next())) :
      of(null);
  }
}
