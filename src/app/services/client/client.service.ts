import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../shared/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getAllClient(): Observable<any[]> {
    return this.http.get<any[]>(`${api}/client/lister`)
  }

  addClient(data: string): Observable<any> {
    return this.http.post<any>(`${api}/client/create`, data);
  }

  updateClient(data: any, id: number): Observable<any> {
    return this.http.put<any>(`${api}/client/edit/${id}`, data);
  }

  deleteClient(id: number): Observable<any> {
    return this.http.delete(`${api}/client/supprimer/${id}`);
  }
}
