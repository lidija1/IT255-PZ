// // flight.service.ts

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class FlightService {
//   private apiUrl = 'http://localhost:3000/flights'; // Prilagodi sa stvarnim endpointom

//   constructor(private http: HttpClient) { }

//   getAllFlights(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }

//   addFlight(flightData: any): Observable<any> {
//     return this.http.post<any>(this.apiUrl, flightData);
//   }

//   updateFlight(flightId: string, flightData: any): Observable<any> {
//     const updateUrl = `${this.apiUrl}/${flightId}`;
//     return this.http.put<any>(updateUrl, flightData);
//   }

//   deleteFlight(flightId: string): Observable<any> {
//     const deleteUrl = `${this.apiUrl}/${flightId}`;
//     return this.http.delete<any>(deleteUrl);
//   }
// }
