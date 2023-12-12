import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api/api.service';
import { Init } from './interfaces/init';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private svc: ApiService
  ) {
  }
  title = 'samurai';

  ngOnInit() {
    this.svc.initGet().subscribe({
      next: (data: Init) => {
        console.log('Data received:', data);
        // Do something with the data
      },
      error: (error) => {
        console.error('Error:', error);
        // Handle error
      },
      complete: () => {
        console.log('Request completed');
        // Handle completion
      }
    });
  }
}
