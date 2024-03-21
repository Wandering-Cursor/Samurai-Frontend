import { createAction, props } from '@ngrx/store';
import { User } from './auth.models';
import { AuthResponse } from 'src/app/interfaces/api-interfaces';

// Register action
export const Register = createAction(
    '[Authentication] Register',
    props<{ email: string, password: string, registration_code: string, username: string }>()
  );export const RegisterSuccess = createAction('[Authentication] Register Success', props<{ user: User }>());
export const RegisterFailure = createAction('[Authentication] Register Failure', props<{ error: string }>());

// login action
export const login = createAction('[Authentication] Login', props<{ username: string, password: string }>());
export const loginSuccess = createAction('[Authentication] Login Success', props<{ authResponse: AuthResponse }>());
export const loginFailure = createAction('[Authentication] Login Failure', props<{ error: string }>());

// logout action
export const logout = createAction('[Authentication] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');


