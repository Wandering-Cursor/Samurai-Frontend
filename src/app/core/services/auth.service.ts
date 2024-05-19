import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../store/Authentication/auth.models';
import { getFirebaseBackend } from 'src/app/authUtils';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { GlobalComponent } from '../../global-component';
import { API_URL } from '../../token/api-url.token';
import {
  AuthResponse,
  TokenRefreshConfig,
} from '../../interfaces/api-interfaces';
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
};

const refreshConfig: TokenRefreshConfig = {
  timeInSeconds: 1700,
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public isUserLoggedIn = false;
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
      uuid: decodedToken.sub,  // Store the UUID from the token
      username: decodedToken.username,
      email: decodedToken.email,
      access_token: accessToken,
      token_type: authResponse.token_type,
    };
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.store.dispatch(loginSuccess({ authResponse }));
    this.isUserLoggedIn = true;
    this.scheduleTokenRefresh(refreshConfig);
  }
  
getCurrentUserUUID(): string {
  const currentUserJson = localStorage.getItem('currentUser');
  if (currentUserJson) {
    const currentUser = JSON.parse(currentUserJson);
    if (currentUser && currentUser.uuid) {
      return currentUser.uuid;
    } else {
      throw new Error('UUID is not available');
    }
  } else {
    throw new Error('User is not logged in');
  }
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
  
    if (!this.isUserLoggedIn) {
      console.log('Token refresh skipped. User not logged in.');
      return throwError('User not logged in');
    }
  
    return this.http
      .post<AuthResponse>(`${AUTH_API}auth/refresh`, {}, httpOptionsForAuth)
      .pipe(
        tap((authResponse: AuthResponse) => {
          localStorage.setItem('access_token', authResponse.access_token);
          const currentUser = this.currentUserSubject.value;
          if (currentUser) {
            currentUser.access_token = authResponse.access_token;
            this.currentUserSubject.next(currentUser);
          }
          this.scheduleTokenRefresh(refreshConfig);
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
    const now = Date.now() / 1000;
    const isExpired = decoded.exp < now;
    return isExpired;
  }

  scheduleTokenRefresh(config: TokenRefreshConfig) {
    const accessToken = localStorage.getItem('access_token');
    if (!this.isUserLoggedIn) {
      return;
    }
    if (!accessToken) {
      return;
    }
    if (this.isTokenExpired(accessToken)) {
      return;
    }
    const decoded: any = jwtDecode(accessToken);
    const exp = decoded.exp; // Token expiration time in seconds
    const now = Date.now() / 1000; // Current time in seconds
    const delay = config.timeInSeconds * 1000;
    if (delay > 0) {
      setTimeout(() => {
        this.tokenRefresh(accessToken).subscribe();
      }, delay);
    } else {
      this.tokenRefresh(accessToken).subscribe();
    }
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
    return this.http
      .post<AuthResponse>(
        `${AUTH_API}auth/token`,
        {
          username: username,
          password: password,
        },
        httpOptionsForAuth
      )
      .pipe(
        map((authResponse: AuthResponse) => {
          this.handleAuthentication(authResponse);
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
      },
      error: (error) => {
        console.error('Error refreshing token:', error);
      },
    });
  }

  logout(): Observable<void> {
    this.store.dispatch(logout());
    this.http
      .post<any>(`${AUTH_API}auth/logout`, {}, httpOptionsForAuth)
      .subscribe();

    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null!);
    this.store.dispatch(logoutSuccess());
    this.isUserLoggedIn = false;
    this.isUserLoggedIn = false;
    return of(undefined).pipe(tap(() => {}));
  }

  resetPassword(email: string) {
    return this.http.post(AUTH_API + 'reset-password', { email }, httpOptions);
  }

  public currentUser(): any {
    return getFirebaseBackend()!.getAuthenticatedUser();
  }
}
