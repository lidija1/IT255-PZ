import { RestService } from '../services/rest.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Let } from '../models/flights.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-letova',
  templateUrl: './lista-letova.component.html',
  styleUrls: ['./lista-letova.component.scss']
})
export class ListaLetovaComponent implements OnInit{
  letovi: Let[] = [];
  id: number = 0;
  pretraga: string = '';
  sortiranoPoCeni: boolean = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private restService: RestService) {}
  ngOnInit() {

  this.restService.getAllLet().subscribe((data: any) => {
    console.log('Response from server:', data);
    this.letovi = data;
  });

  this.restService.getAllLet()
    .subscribe((data: Let[]) => {
      this.letovi = data;
    });

    this.route.params.subscribe(params => {
      this.id = +params['id']; // Dohvatite ID iz ruta
      // Pozovite metodu ili API za dohvatanje podataka o letu na osnovu flightId
    });
  }
  // kupiKartu(id: number): void {
  //   this.router.navigate(['/kupovanje-karte', id]);
  // }
  sortirajPoCeni() {
    // Koristite operator za poređenje numeričkih vrednosti
    this.letovi.sort((a, b) => a.cena - b.cena);
  }
  
  

  toggleSortiranjePoCeni() {
    // Obrnite trenutno stanje sortiranja po ceni
    this.sortiranoPoCeni = !this.sortiranoPoCeni;

    if (this.sortiranoPoCeni) {
      this.sortirajPoCeni();
    }
  }
  pretrazi() {
    // Filtrirajte listu letova na osnovu unetog teksta
    this.letovi = this.filterLetovi(this.pretraga);
  }

  filterLetovi(kriterijum: string): any[] {
    // Implementirajte logiku filtriranja prema vašim potrebama
    // Na primer, možete koristiti Array.filter() metodu
    return this.letovi.filter(letov => 
      letov.od.toLowerCase().includes(kriterijum.toLowerCase()) ||
      letov.destinacija.toLowerCase().includes(kriterijum.toLowerCase()) ||
      letov.vreme.toLowerCase().includes(kriterijum.toLowerCase())
      // Dodajte ostale kriterijume pretrage prema potrebi
    );
  }
  kupiKartu(letId: number) {
    // Pronađite odabrani let na osnovu letId, možda iz servisa ili lokalne liste
    const odabraniLet = this.letovi.find(letovi => letovi.id === letId);

    // Provera da li je pronađen odabrani let
    if (odabraniLet) {
        // Navigacija na sledeću stranicu (kupovanjeKarteComponent) sa podacima o letu
        this.router.navigate(['/kupovanje-karte', letId]);
    }
}

  // async azurirajLet(letovi: Let): Promise<void> {
  //   this.refreshLet();
  //   console.log('Vrednost izabranog telefona (pre postavljanja):', letovi);

  //   // Postavi vrednosti forme na osnovu izabranog telefona
  //   this.letForm.patchValue({
  //     id: letovi.id,
  //     od: letovi.od,
  //     destinacija: letovi.destinacija,
  //     vreme: letovi.vreme,
  //     brojputnika: letovi.brojputnika,
  
  //   });
}
