// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { ApiService } from './app/services/api/api.service';
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    ApiService,
  ]
}).catch(err => console.error(err));
