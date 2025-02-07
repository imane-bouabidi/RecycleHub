import { createReducer, on } from '@ngrx/store';
import { loadRequestsSuccess, addRequest, updateRequest, deleteRequest } from './collect.actions';
import { CollectRequest } from '../../models/collect-request.model';

export interface CollectState {
  requests: CollectRequest[];
}

export const initialState: CollectState = {
  requests: []
};

export const collectReducer = createReducer(
  initialState,
  on(loadRequestsSuccess, (state, { requests }) => ({
    ...state,
    requests
  })),
  on(addRequest, (state, { request }) => ({
    ...state,
    requests: [...state.requests, request]
  })),
  on(updateRequest, (state, { requestId, updates }) => ({
    ...state,
    requests: state.requests.map(req =>
      req.id === requestId ? { ...req, ...updates } : req
    )
  })),
  on(deleteRequest, (state, { requestId }) => ({
    ...state,
    requests: state.requests.filter(req => req.id !== requestId)
  }))
);
