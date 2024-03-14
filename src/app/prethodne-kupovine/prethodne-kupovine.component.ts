// prethodne-kupovine.component.ts
import { Component, OnInit } from '@angular/core';
import { KupovinaService } from '../services/kupovina.service';

@Component({
  selector: 'app-prethodne-kupovine',
  templateUrl: './prethodne-kupovine.component.html',
  styleUrls: ['./prethodne-kupovine.component.scss']
})
export class PrethodneKupovineComponent implements OnInit {
  kupovine: any[] = [];

  constructor(private kupovinaService: KupovinaService) { }

  ngOnInit() {
    this.kupovinaService.getKupovine().subscribe(
      (data: any[]) => {
        this.kupovine = data;
      },
      error => {
        console.error('Error fetching data: ', error);
      }
    );
  }
}
