import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Init } from '../../interfaces/init';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  private readonly GET_HELLO_WORLD = `https://api.obscurial.art/`;

  initGet(): Observable<Init> {
    return this.http.get<Init>(this.GET_HELLO_WORLD).pipe(
    )
  }
}