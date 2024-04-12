import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../store/Authentication/auth.models';
import { getFirebaseBackend } from 'src/app/authUtils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { GlobalComponent } from '../../global-component';
import { API_URL } from '../../token/api-url.token';
import { AuthResponse } from '../../interfaces/api-interfaces';
// Action
import {
  login,
  loginSuccess,
  loginFailure,
  logout,
  logoutSuccess,
  RegisterSuccess,
  RegisterFailure,
} from '../../store/Authentication/authentication.actions';
import { jwtDecode } from 'jwt-decode';

// Firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

const AUTH_API = GlobalComponent.API_URL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const httpOptionsForAuth = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true,
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user!: User;
  currentUserValue: any;

  private currentUserSubject: BehaviorSubject<User>;

  constructor(
    private http: HttpClient,
    private store: Store,
    private afAuth: AngularFireAuth
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
  }

  

  handleAuthentication(authResponse: AuthResponse, refreshToken?: string) {
    const accessToken = authResponse.access_token;
    localStorage.setItem('access_token', accessToken);
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
    const decodedToken: any = jwtDecode(accessToken);
    const user: User = {
      username: decodedToken.username,
      email: decodedToken.email,
      access_token: accessToken,
      token_type: authResponse.token_type,
    };
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.store.dispatch(loginSuccess({ authResponse }));
    this.scheduleTokenRefresh();
  }

  public tokenCreate(
    username: string,
    password: string
  ): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${AUTH_API}/api/accounts/token`, {
      username: username,
      password: password,
    });
  }

  public tokenRefresh(accessToken: string): Observable<AuthResponse> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    return this.http.post<AuthResponse>(`${AUTH_API}auth/refresh`, {}, { headers }).pipe(
      tap((authResponse: AuthResponse) => {
        localStorage.setItem('access_token', authResponse.access_token);
        const currentUser = this.currentUserSubject.value;
        if (currentUser) {
          currentUser.access_token = authResponse.access_token;
          this.currentUserSubject.next(currentUser);
        }
        this.scheduleTokenRefresh();
      }),
      catchError((error: any) => {
        const errorMessage = 'Token refresh failed';
        this.store.dispatch(loginFailure({ error: errorMessage }));
        return throwError(errorMessage);
      })
    );
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }
    const decoded: any = jwtDecode(token);
    const now = Date.now() / 1000; // Current time in seconds
    return decoded.exp < now;
  }

  scheduleTokenRefresh() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken || this.isTokenExpired(accessToken)) {
      return;
    }
    const decoded: any = jwtDecode(accessToken);
    const exp = decoded.exp;
    const now = Date.now() / 1000;
    const delay = (exp - now) * 1000 - 20000;

    setTimeout(() => {
      this.tokenRefresh(accessToken).subscribe();
    }, delay);
  }

  // Sign out the current user
  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }

  

  public register(
    email: string,
    password: string,
    registration_code: string,
    username: string
  ) {
    const signUpData = {
      email: email,
      password: password,
      registration_code: registration_code,
      username: username,
    };

    return this.http
      .post(`${AUTH_API}account/register`, signUpData, httpOptions)
      .pipe(
        map((response: any) => {
          const user = response;
          this.store.dispatch(RegisterSuccess({ user }));
          return user;
        }),
        catchError((error: any) => {
          const errorMessage = 'Registration failed';
          this.store.dispatch(RegisterFailure({ error: errorMessage }));
          return throwError(errorMessage);
        })
      );
  }

  public login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${AUTH_API}auth/token`, {
      username: username,
      password: password,
    }, httpOptionsForAuth).pipe(
      map((authResponse: AuthResponse) => {
        this.handleAuthentication(authResponse);
        this.refreshTokenImmediately(authResponse.access_token);
        return authResponse;
      }),
      catchError((error: any) => {
        const errorMessage = 'Login failed';
        this.store.dispatch(loginFailure({ error: errorMessage }));
        return throwError(errorMessage);
      })
    );
  }

  refreshTokenImmediately(accessToken: string) {
    this.tokenRefresh(accessToken).subscribe({
      next: (authResponse) => {
        console.log('Token refreshed successfully:', authResponse.access_token);
      },
      error: (error) => {
        console.error('Error refreshing token:', error);
      }
    });
  }


  logout(): Observable<void> {
    this.store.dispatch(logout());
    this.http.post<any>(
      `${AUTH_API}auth/logout`,
      {},
      httpOptionsForAuth,
    ).subscribe();

    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null!);
    this.store.dispatch(logoutSuccess());

    return of(undefined).pipe(
      tap(() => {
      })
    );
  }

  resetPassword(email: string) {
    return this.http.post(AUTH_API + 'reset-password', { email }, httpOptions);
  }

  public currentUser(): any {
    return getFirebaseBackend()!.getAuthenticatedUser();
  }
}
