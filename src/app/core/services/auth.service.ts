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

  public tokenCreate(
    username: string,
    password: string
  ): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${AUTH_API}/api/accounts/token`, {
      username: username,
      password: password,
    });
  }

  public tokenRefresh(refresh: string) {
    return this.http.post(`${AUTH_API}api/accounts/token`, {
      refresh: refresh,
    });
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
        if (authResponse && authResponse.access_token) {
          // Create a User object from the AuthResponse
          const user: User = {
            username: username, // Use the username from the login method's argument
            email: '', // You need to get the email from somewhere, possibly from the response or another source
            access_token: authResponse.access_token,
            token_type: authResponse.token_type,
          };

          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', authResponse.access_token);
          this.currentUserSubject.next(user); // Now passing a User object
        }
        this.store.dispatch(loginSuccess({ authResponse }));
        return authResponse;
      }),
      catchError((error: any) => {
        const errorMessage = 'Login failed';
        this.store.dispatch(loginFailure({ error: errorMessage }));
        return throwError(errorMessage);
      })
    );
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
        // Perform any additional logic after the logout is successful
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
