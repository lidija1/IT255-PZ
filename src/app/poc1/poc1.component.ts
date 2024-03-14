import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poc1',
  standalone: true,
  imports: [],
  templateUrl: './poc1.component.html',
  styleUrl: './poc1.component.scss'
})
export class Poc1Component {

  constructor(private router: Router) {}

  returnToHome():void {
    this.router.navigate(['/pocetna'])
  }

}
