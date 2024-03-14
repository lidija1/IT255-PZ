import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poc2',
  standalone: true,
  imports: [],
  templateUrl: './poc2.component.html',
  styleUrl: './poc2.component.scss'
})
export class Poc2Component {

  constructor(private router: Router) {}

  returnToHome():void {
    this.router.navigate(['/pocetna'])
  }

}
