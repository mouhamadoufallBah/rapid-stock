import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { api } from '../../shared/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  constructor(private http: HttpClient) { }

  addEmploye(data: string): Observable<any> {
    return this.http.post<any>(`${api}/register`, data);
  }

  login(email: string, password: string): Observable<any> {
    const data = { email, password };
    return this.http.post<any>(`${api}/login`, data);
  }

  updateEmploye(data: any, id: number): Observable<any> {
      const accessToken = localStorage.getItem('access_token');

      return accessToken ?
        this.http.put<any>(`${api}/client/edit/${id}`, data, {
          headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
        }) :
        of(null);

  }

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
    }) : of(null);
  }

  logout(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.post<any>(`${api}/logout`, {}, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null);
  }

}
