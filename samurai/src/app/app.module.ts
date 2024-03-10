import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { environment } from './interfaces/evironment';
import { API_URL } from './token/api-url.token';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    { provide: API_URL, useValue: environment.API_REST_URL },
  ]
})

export class AppModule { }
