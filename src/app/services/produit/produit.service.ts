import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, of, tap } from 'rxjs';
import { api } from '../../shared/apiUrl';
import { Storage, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Cacheable } from 'ts-cacheable';

const cacheBuster$ = new Subject<void>();

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient, private storage: Storage) { }


  addProduct(data: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.post<any>(`${api}/produit/create`, data, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }).pipe(tap(() => cacheBuster$.next())) :
      of(null);
  }

  @Cacheable({cacheBusterObserver: cacheBuster$})
  getAllProduct(): Observable<any> {
    return  this.http.get<any>(`${api}/produits/lister`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${api}/produit/detail/${id}`);
  }

  @Cacheable({cacheBusterObserver: cacheBuster$})
  getProductByIdCategorie(id: number): Observable<any> {
    return this.http.get<any>(`${api}/produit/${id}`);
  }

  updateProduct(id: number, data: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.put<any>(`${api}/produit/edit/${id}`, data, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }).pipe(tap(() => cacheBuster$.next())) :
      of(null);
  }

  deleteProduct(id: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.delete<any>(`${api}/produit/supprimer/${id}`, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }).pipe(tap(() => cacheBuster$.next())) :
      of(null);
  }

    async addFile(fichier: File): Promise<string> {
      try {
        const randomFileName = `${Math.floor(Math.random() * 100000)}`;
        const fileref = ref(this.storage, `fichier/rapidStokProduct${randomFileName}`);
        const uploadTask = uploadBytesResumable(fileref, fichier);

        await uploadTask;

        return await getDownloadURL(fileref);
      } catch (error) {
        console.log(error);

        throw error;
      }
    }

  @Cacheable({cacheBusterObserver: cacheBuster$})
  getAllNotification(): Observable<any>{
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.get<any>(`${api}/notification/lister`, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }) :
      of(null);
  }

  updateEtatNotification(id: string): Observable<any>{
    const accessToken = localStorage.getItem('access_token');

    return accessToken ?
      this.http.put<any>(`${api}/notification/read/${id}`, {}, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${accessToken}` })
      }).pipe(tap(() => cacheBuster$.next())) :
      of(null);
  }

}
