import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from '../../shared/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AchatService {

  constructor(private http: HttpClient) { }

  addAchat(data: any): Observable<any> {
    return this.http.post<any>(`${api}/achat/create`, data);
  }

  getAllAchat(): Observable<any> {
    return this.http.get<any>(`${api}/achat/lister`);
  }

  getAchatById(id: number): Observable<any> {
    return this.http.get<any>(`${api}/achat/detail/${id}`);
  }

  updateAchat(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${api}/achat/edit/${id}`, data);
  }

  deleteAchat(id: number): Observable<any> {
    return this.http.delete<any>(`${api}/achat/supprimer/${id}`);
  }
}
