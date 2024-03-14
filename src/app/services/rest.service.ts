import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Let } from '../models/flights.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  // getLetById(id: number): Observable<Let> {
  //   return this.http.get<Let>(`${this.apiUrl}/kupovanje-karte/${id}`);
  // // }

  // getLetById(id: number): Observable<Let> {
  //   return this.http.get<Let>(`${this.apiUrl}/kupovanje-karte/${id}`).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       console.error('Error fetching let details:', error);
  //       throw error; // Rethrow the error to be caught by the subscriber
  //     })
  //   );
  // }
  
//radilo za prikaz samo forme
  getLetById(id: number): Observable<Let> {
    return this.http.get<Let>(`${this.apiUrl}/kupovanje-karte/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching letovi details:', error);
        throw error;
         // Rethrow the error to be caught by the subscriber
      })
    );
  }
  getDataById(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get(url);
  }


  zavrsiKupovinuKarte(letId: number, brojPutnika: number): Observable<any> {
    const url = `${this.apiUrl}/kupovanje-karte/${letId}`;
    const body = { brojPutnika }; // Ovo je body zahteva koji šaljemo na server

    this.router.navigate(['/kupljena-karta']);
    return this.http.post(url, {brojPutnika});
  }

  getAllLet(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin`);
  }  

  addLet(letovi: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/admin`, letovi);
  }

  updateLet(id: number, letovi: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/admin/${id}`, letovi);
  }

  deleteLet(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/admin/${id}`);
  }
  async someAsyncOperation(): Promise<void> {
    return new Promise<void>(resolve => {
      // Simulacija asinhrone operacije koja traje neko vreme (npr. 2 sekunde)
      setTimeout(() => {
        console.log('Asinhrona operacija je zavrsena.');
        resolve();
      }, 2000);
    });
  }
}


    // login( username: string, password: string ): Observable<any> {
    //   const body = { username, password };
    //   return this.http.post(`${this.apiUrl}/login`, body);
    // }








  // authenticateUser(username: string, password: string): Observable<any> {
  //   const endpoint = `${this.apiUrl}/login`;

  //   const body = {
  //     username: username,
  //     password: password
  //   };
  //   // U ovom slučaju, koristi pipe() i tap() operator da rukuješ odgovorom od servera
  //   return this.http.post<any>(endpoint, body).pipe(
  //     tap(response => {
  //       // Ako prijava uspe, preusmeri korisnika na /admin
  //       if (response && response.success) {
  //         this.router.navigate(['/admin']);
  //       }
  //       // Ako želiš rukovati neuspešnim prijavljivanjem, to možeš dodati ovde
  //     })
  //   );
  // }
