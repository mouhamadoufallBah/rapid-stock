import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of, tap } from 'rxjs';
import { api } from '../../shared/apiUrl';
import { Cacheable } from 'ts-cacheable';

const cacheBuster$ = new Subject<void>();

@Injectable({
  providedIn: 'root'
})
export class VenteService {

  constructor(private http: HttpClient) { }

  addVente(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.post<any>(`${api}/vente/create`, data, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }).pipe(tap(() => cacheBuster$.next())) :
      of(null);
  }

  @Cacheable({cacheBusterObserver: cacheBuster$})
  getAllVente(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.get<any>(`${api}/vente/lister`, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null);
  }

  @Cacheable({cacheBusterObserver: cacheBuster$})
  getLatestVentes() {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.get<any>(`${api}/vente/derniereVente`, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null);
  }

  getVenteById(id: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.get<any>(`${api}/vente/detail/${id}`, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null);
  }

  updateVente(id: number, data: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.put<any>(`${api}/vente/edit/${id}`, data, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }).pipe(tap(() => cacheBuster$.next())) :
      of(null);
  }

  deleteVente(id: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.delete<any>(`${api}/vente/supprimer/${id}`, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }).pipe(tap(() => cacheBuster$.next())) :
      of(null);
  }

  getVenteInfo(vente_id: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.get<any>(`${api}/historiquevente/${vente_id}`, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null);
  }

  @Cacheable({cacheBusterObserver: cacheBuster$})
  getTotalParMois(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.get<any>(`${api}/ventes/total-par-mois`, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null);
}
}


