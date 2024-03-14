import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kupljena-karta',
  templateUrl: './kupljena-karta.component.html',
  styleUrls: ['./kupljena-karta.component.scss']
})
export class KupljenaKartaComponent {

  constructor(private router: Router) {}

  nazadNaPocetnu() {
    // Navigiraj nazad na početnu stranicu ili drugu željenu stranicu
    this.router.navigate(['/pocetna']);
  }

}
