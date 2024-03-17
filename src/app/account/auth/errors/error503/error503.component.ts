import { Component } from '@angular/core';

@Component({
  selector: 'app-error503',
  templateUrl: './error503.component.html',
  styleUrls: ['./error503.component.scss']
})
  
// Error 503 Component
export class Error503Component {
  // set the currenr year
  year: number = new Date().getFullYear();
}
