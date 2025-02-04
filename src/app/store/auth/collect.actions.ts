import { createAction, props } from '@ngrx/store';
import { CollectRequest } from '../../models/collect-request.model';

export const loadRequests = createAction('[Collect] Load Requests');

export const loadRequestsSuccess = createAction(
  '[Collect] Load Requests Success',
  props<{ requests: CollectRequest[] }>()
);

export const loadRequestsFailure = createAction(
  '[Collect] Load Requests Failure',
  props<{ error: string }>()
);

export const selectRequest = createAction(
  '[Collect] Select Request',
  props<{ requestId: string }>()
);
