import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { authReducer } from './auth/auth.reducer';
import { collectReducer } from './collect/collect.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  collect: collectReducer
};
