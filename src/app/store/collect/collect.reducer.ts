import { createReducer, on } from '@ngrx/store';
import { CollectState } from '../app.state';
import {loadRequestsSuccess, selectRequest} from './collect.actions';

export const initialState: CollectState = {
  requests: [],
  selectedRequest: null
};

export const collectReducer = createReducer(
  initialState,
  on(loadRequestsSuccess, (state, { requests }) => ({
    ...state,
    requests
  })),
  on(selectRequest, (state, { requestId }) => ({
    ...state,
    selectedRequest: state.requests.find((r) => r.id === requestId) || null
  }))
);
