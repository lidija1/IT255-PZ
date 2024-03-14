import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: boolean = false;

  constructor(private router: Router) { }

  login(username: string, password: string): Observable<boolean> {
    // Simulacija logiranja (prilagodite prema stvarnom procesu)
    if (username === 'your_username' && password === 'your_password') {
      this.loggedIn = true;
      return of(true);
    } else {
      this.loggedIn = false;
      return of(false);
    }
  }

  logout(): void {
    // Simulacija odjave
    this.loggedIn = false;
    this.router.navigate(['/login']); // Preusmeravanje na login stranicu (prilagodite prema vašem putu)
  }
  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }
}
