import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, exhaustMap, tap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { AuthenticationService } from '../../core/services/auth.service';
import { login, loginSuccess, loginFailure, logout, logoutSuccess, Register, RegisterFailure, RegisterSuccess } from './authentication.actions';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/interfaces/api-interfaces';

@Injectable()
export class AuthenticationEffects {
  // Updated Register$ effect to include registration_code and username
  Register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Register),
      exhaustMap(({ email, password, registration_code, username }) =>
        this.AuthenticationService.register(email, password, registration_code, username).pipe(
          map((user) => {
            this.router.navigate(['/auth/login']);
            return RegisterSuccess({ user });
          }),
          catchError((error) => of(RegisterFailure({ error })))
        )
      )
    )
  );
  login$ = createEffect(() =>
  this.actions$.pipe(
    ofType(login),
    exhaustMap(({ username, password }) =>
      this.AuthenticationService.login(username, password).pipe(
        map((authResponse: AuthResponse) => {
          if (authResponse && authResponse.access_token) {
            localStorage.setItem('token', authResponse.access_token);
            localStorage.setItem('token_type', authResponse.token_type);
            this.router.navigate(['/']); // Navigate to the home page or dashboard
          }
          return loginSuccess({ authResponse }); // Make sure this matches the updated action
        }),
        catchError((error) => of(loginFailure({ error })))
      )
    )
  )
);

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => {
        // Perform any necessary cleanup or side effects before logging out
      }),
      exhaustMap(() => of(logoutSuccess()))
    )
  );

  constructor(
    @Inject(Actions) private actions$: Actions,
    private AuthenticationService: AuthenticationService,
    private router: Router
  ) { }

}