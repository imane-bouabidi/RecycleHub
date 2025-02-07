import { createReducer, on } from '@ngrx/store';
import { loginSuccess, signupSuccess, logout, signupFailure } from './auth.actions';
import { AuthState } from '../app.state';
import { AuthService } from '../../services/auth/auth.service';

const authService = new AuthService();

export const initialState: AuthState = {
  user: authService.getCurrentUser(),
  isLoggedIn: !!authService.getCurrentUser(),
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isLoggedIn: true,
    error: null
  })),
  on(signupSuccess, (state, { user }) => ({
    ...state,
    user,
    isLoggedIn: true,
    error: null
  })),
  on(logout, (state) => ({
    ...state,
    user: null,
    isLoggedIn: false,
    error: null
  })),
  on(signupFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
