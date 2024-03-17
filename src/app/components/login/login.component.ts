import { Component } from '@angular/core';
import { AuthService } from '../../service/auth/auth.service';
import { AuthResponse } from '../../interfaces/api-interfaces';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

login() {
    this.authService.tokenCreate(this.email, this.password).subscribe({
      next: (response: AuthResponse) => {
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
      },
      error: (error) => {
        // Handle login error
      }
    });
  } 
}