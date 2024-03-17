import { Component } from '@angular/core';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['./lockscreen.component.scss']
})
  
// Lock Screen Component
export class LockscreenComponent {
  // set the currenr year
  year: number = new Date().getFullYear();
}
