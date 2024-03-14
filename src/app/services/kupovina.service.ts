// kupovina.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KupovinaService {
  private apiUrl = 'http://localhost:3000/kupovine'; // adjust this URL based on your backend server

  constructor(private http: HttpClient) { }

  getKupovine(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
