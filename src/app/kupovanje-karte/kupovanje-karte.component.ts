import { Component, OnInit } from '@angular/core';
import { Let } from '../models/flights.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RestService } from '../services/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-kupovanje-karte',
  templateUrl: './kupovanje-karte.component.html',
  styleUrls: ['./kupovanje-karte.component.scss']
})
export class KupovanjeKarteComponent implements OnInit {
  // letovi: Let[] = [];
  letovi: any[] = [];
  brojputnika: number = 1;
  zeljeniPrtljag: boolean = false;
  
  
  constructor(private router: Router, private http: HttpClient, private restService: RestService, private route: ActivatedRoute) {}

 
  
//hoce prikaz samo forme ciste bez podataka
ngOnInit() {
    // Get the flight ID from the route parameters
    const idString = this.route.snapshot.paramMap.get('id');

    // Check if idString is not null or undefined before converting to a number
    if (idString !== null && idString !== undefined) {
      const id = +idString;

      // Fetch the details of the selected flight using the ID
      this.restService.getLetById(id).subscribe(
        (data: Let) => {
          // (data: any) => {
          this.letovi = [data];
          
          // this.letovi = data.map((item: any) => item[0]);
          console.log('Dužina niza letovi:', this.letovi.length);
          console.log('podaci iz letovi', this.letovi)
        },
        (error: HttpErrorResponse) => {
          if (error.status === 404) {
            console.log('Let nije pronađen.');
            // Ovde možete dodati kod koji želite izvršiti kada let nije pronađen.
          } else {
            console.error('Greška pri dobijanju detalja o letu:', error);
          }
        }
      );
    } else {
      console.error('ID not found in route parameters.');
    }
  }

  
  
  // ukupnaCena(): number {
  //   return this.letovi[0].cena * this.brojputnika;
  // }
  ukupnaCena(): number {
    const cenaPrtljaga = this.zeljeniPrtljag ? 1000 : 0; // Cena prtljaga je 20 ako je izabran, inače 0
    const osnovnaCena = this.letovi.length > 0 ? this.letovi[0].cena : 0; // Postavite osnovnu cenu prema potrebi
  
    return (osnovnaCena + cenaPrtljaga) * this.brojputnika;
  }

  // zavrsiKupovinuKarte(): void {
  //   // Pozovi REST servis za kupovinu karte
  //   this.restService.zavrsiKupovinuKarte(this.letovi[0].id, this.brojputnika).subscribe(
  //     (response) => {
  //       console.log('Uspešno kupljena karta:', response);
  //       // Ovde možeš dodati logiku za prikazivanje poruke o uspešnoj kupovini
  //     },
  //     (error) => {
  //       console.error('Greška pri kupovini karte:', error);
  //       // Ovde možeš dodati logiku za prikazivanje poruke o grešci
  //     }
  //   );
  // }

  zavrsiKupovinuKarte(): void {
    const podaciKupovine = {
      od: this.letovi[0].od,
      destinacija: this.letovi[0].destinacija,
      vreme: this.letovi[0].vreme,
      brojputnika: this.brojputnika,
      zeljeniPrtljag: this.zeljeniPrtljag,
      ukupnaCena: this.ukupnaCena()
    };

    this.http.post('http://localhost:3000/sacuvaj-kupovinu', podaciKupovine)
      .subscribe(response => {
        console.log('Purchase saved successfully');
        // Dodajte logiku koja se izvršava nakon uspešnog čuvanja kupovine
      }, error => {
        console.error('Error saving purchase:', error);
        // Dodajte logiku za rukovanje greškom
      });
      this.router.navigate(['/kupljena-karta']);
  }

}

  // ngOnInit() {
  //   console.log('ngOnInit is called.');
  //   const idString = this.route.snapshot.paramMap.get('id');
  //   console.log('ID from route:', idString);


  //   // Check if idString is not null or undefined before converting to a number
  //   if (idString !== null && idString !== undefined) {
  //     const id = +idString;

  //     // Fetch the details of the selected flight using the ID
  //     this.restService.getLetById(id).subscribe((data: Let) => {
  //       this.letovi = [data];
  //     });
  //   }
  // } 

  // ngOnInit() {
  //   // Get the flight ID from the route parameters
  //   const id = +this.route.snapshot.paramMap.get('id');

  //   // Fetch the details of the selected flight using the ID
  //   this.restService.getLetById(id).subscribe((data: Let) => {
  //     this.letovi = [data];
  //   });
  // }
  // ngOnInit() {

  //   this.restService.getAllLet().subscribe((data: any) => {
  //     console.log('Response from server:', data);
  //     this.letovi = data;
  //   });

  //   this.restService.getAllLet()
  //     .subscribe((data: Let[]) => {
  //       this.letovi = data;
  //     });
  // }
