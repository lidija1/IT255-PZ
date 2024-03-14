import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pocetna',
  standalone: true,
  imports: [],
  templateUrl: './pocetna.component.html',
  styleUrl: './pocetna.component.scss'
})
export class PocetnaComponent {

  constructor(private router: Router) {}

  poc1():void {
    this.router.navigate(['/poc1'])
  }
  poc2():void {
    this.router.navigate(['/poc2'])
  }
  poc3():void {
    this.router.navigate(['/poc3'])
  }

}
