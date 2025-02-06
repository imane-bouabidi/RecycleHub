import { createReducer, on } from '@ngrx/store';
import {loginSuccess, logout, signupFailure, signupSuccess} from './auth.actions';
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
  })),

  on(signupSuccess, (state, { user }) => {
    console.log('Reducer: Signup success, updating state with user:', user);
    return {
      ...state,
      user,
      isLoggedIn: true,
      error: null
    };
  }),
  on(signupFailure, (state, { error }) => {
    console.error('Reducer: Signup failed, updating state with error:', error);
    return {
      ...state,
      error
    };
  })
);


