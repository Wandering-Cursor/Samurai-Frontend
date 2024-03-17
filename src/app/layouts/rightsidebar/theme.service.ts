// theme.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>('default');

  getTheme(): Observable<string> {
    return this.themeSubject.asObservable();
  }

  setTheme(theme: string): void {
    this.themeSubject.next(theme);
  }
}