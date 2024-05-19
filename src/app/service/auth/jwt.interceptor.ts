import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { AuthResponse } from 'src/app/interfaces/api-interfaces';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  constructor(private injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthenticationService);
    let accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      req = this.addTokenHeader(req, accessToken);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !req.url.endsWith('/api/accounts/token')) {
          if (authService.isUserLoggedIn) {
            return this.handle401Error(req, next, authService);
          } else {
            return throwError(() => error);
          }
        }
        return throwError(() => error);
      })
    );
  }

  private addTokenHeader(
    request: HttpRequest<any>,
    token: string
  ): HttpRequest<any> {
    return request.clone({
      headers: request.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler,
    authService: AuthenticationService
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      const accessToken = localStorage.getItem('access_token');
      // Only attempt to refresh the token if it is expired
      if (accessToken && authService.isTokenExpired(accessToken)) {
        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);

        return authService.tokenRefresh(accessToken).pipe(
          switchMap((authResponse: AuthResponse) => {
            this.isRefreshing = false;
            this.refreshTokenSubject.next(authResponse.access_token);
            return next.handle(
              this.addTokenHeader(request, authResponse.access_token)
            );
          }),
          catchError((error) => {
            this.isRefreshing = false;
            authService.logout();
            return throwError(() => error);
          })
        );
      } else {
        // If the token is not expired, just forward the original error
        return throwError(() => new Error('Received 401 with a valid token'));
      }
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => next.handle(this.addTokenHeader(request, token!)))
      );
    }
  }
}
