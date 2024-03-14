import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poc3',
  standalone: true,
  imports: [],
  templateUrl: './poc3.component.html',
  styleUrl: './poc3.component.scss'
})
export class Poc3Component {

  constructor(private router: Router) {}

  returnToHome():void {
    this.router.navigate(['/pocetna'])
  }

}
