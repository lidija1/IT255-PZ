import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Let } from '../models/flights.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  getLetById(id: number): Observable<Let> {
    return this.http.get<Let>(`${this.apiUrl}/kupovanje-karte/${id}`);
  }

  getAllLet(): Observable<any> {
    return this.http.get(`${this.apiUrl}/letovi`);
  }

  addLet(letovi: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/letovi`, letovi);
  }

  updateLet(id: number, letovi: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/letovi/${id}`, letovi);
  }

  deleteLet(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/letovi/${id}`);
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













  authenticateUser(username: string, password: string): Observable<any> {
    const endpoint = `${this.apiUrl}/login`;

    const body = {
      username: username,
      password: password
    };

    // U ovom slučaju, koristi pipe() i tap() operator da rukuješ odgovorom od servera
    return this.http.post<any>(endpoint, body).pipe(
      tap(response => {
        // Ako prijava uspe, preusmeri korisnika na /admin
        if (response && response.success) {
          this.router.navigate(['/admin']);
        }
        // Ako želiš rukovati neuspešnim prijavljivanjem, to možeš dodati ovde
      })
    );
  }
}