import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface AdminCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  adminCredentials: AdminCredentials = { username: '', password: '' };
  errorMessage: string = '';


  constructor(private http: HttpClient, private router: Router){}


  login(): void {
    this.http.post<LoginResponse>('http://localhost:3000/login', this.adminCredentials)
      .subscribe(response => {
        if (response.success) {
          console.log('Admin login successful:', response.message);
          this.router.navigate(['/letovi']); // Preusmeravanje na izmenapodataka
        } else {
          this.errorMessage = response.message;
          console.error('Admin login failed:', response.message);
        }
      }, error => {
        console.error('Admin login error:', error);
  
        if (error instanceof HttpErrorResponse) {
          // Obrada HTTP greške
          if (error.status === 401) {
            this.errorMessage = 'Pogrešno korisničko ime ili lozinka.';
          } else {
            this.errorMessage = 'Došlo je do greške prilikom prijave. Pokušajte ponovo.';
          }
  
          console.error('HTTP error status:', error.status);
          console.error('HTTP error message:', error.message);
        }
  
        // Dodajte redirekciju ili druge radnje koje želite preduzeti u slučaju greške
      });
  }
  
}