import { Component } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
  
// Logout Component
export class LogoutComponent {
  // set the currenr year
  year: number = new Date().getFullYear();
}
