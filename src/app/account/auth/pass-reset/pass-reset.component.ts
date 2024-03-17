import { Component } from '@angular/core';

@Component({
  selector: 'app-pass-reset',
  templateUrl: './pass-reset.component.html',
  styleUrls: ['./pass-reset.component.scss']
})

// Password Reset 
export class PassResetComponent {
  // set the currenr year
  year: number = new Date().getFullYear();
}
