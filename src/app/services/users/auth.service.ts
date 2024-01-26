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
    return this.http.put<any>(`${api}/client/edit/${id}`, data);
  }

  getAllEmploye(): Observable<any[]> {
    return this.http.get<any[]>(`${api}/employe/lister`)
  }

  logout(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.post<any>(`${api}/logout`, {}, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null); // Emit a null value if no token is found
  }

}
