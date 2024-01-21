import { Component, OnInit } from '@angular/core';
import { Let } from '../models/flights.model';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../services/rest.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-kupovanje-karte',
  templateUrl: './kupovanje-karte.component.html',
  styleUrls: ['./kupovanje-karte.component.scss']
})
export class KupovanjeKarteComponent implements OnInit {
  letovi: Let[] = [];
  brojputnika: number = 1;

  constructor(private http: HttpClient, private restService: RestService, private route: ActivatedRoute) { }

  ngOnInit() {
    // Get the flight ID from the route parameters
    const idString = this.route.snapshot.paramMap.get('id');
  
    // Check if idString is not null or undefined before converting to a number
    if (idString !== null && idString !== undefined) {
      const id = +idString;
  
      // Fetch the details of the selected flight using the ID
      this.restService.getLetById(id).subscribe((data: Let) => {
        this.letovi = [data];
      });
    } else {
      console.error('ID not found in route parameters.');
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

  ukupnaCena(): number {
    return this.letovi[0].cena * this.brojputnika;
  }

  kupiKartu(): void {
    this.letovi[0].brojputnika -= this.brojputnika;
  }


}
