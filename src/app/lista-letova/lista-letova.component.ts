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
  kupiKartu(id: number): void {
    this.router.navigate(['/kupovanje-karte', id]);
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
