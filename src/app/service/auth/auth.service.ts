import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_URL } from '../../token/api-url.token';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../interfaces/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {}

  public tokenCreate(email: string, password: string): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.apiUrl}/api/accounts/token`, {
      email: email,
      password: password,
    });
  }

  public tokenRefresh(refresh: string) {
    return this.httpClient.post(`${this.apiUrl}/api/accounts/token`, {
      refresh: refresh,
    });
  }

  public signUp(email: string, password: string, registration_code: string) {
    return this.httpClient.post(`${this.apiUrl}/api/accounts/sign-up`, {
      email: email,
      password: password,
      registration_code: registration_code,
    });
  }
}
