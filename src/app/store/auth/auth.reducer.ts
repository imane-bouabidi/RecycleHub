import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';
import { AuthState } from '../app.state';

export const initialState: AuthState = {
  user: null,
  isLoggedIn: false
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isLoggedIn: true
  })),
  on(logout, (state) => ({
    ...state,
    user: null,
    isLoggedIn: false
  }))
);
