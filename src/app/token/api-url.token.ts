import { InjectionToken } from "@angular/core";
import { environment } from "../interfaces/evironment";

export const API_URL = new InjectionToken<string>('apiUrl', {
  providedIn: 'root',
  factory: () => environment.API_REST_URL
});
