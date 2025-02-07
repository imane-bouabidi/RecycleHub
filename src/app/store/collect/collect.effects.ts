import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  loadRequests,
  loadRequestsSuccess,
  loadRequestsFailure,
  addRequest,
  updateRequest,
  deleteRequest
} from './collect.actions';
import {CollectService} from '../../services/collect/collect.service';

@Injectable()
export class CollectEffects {
  constructor(
    private actions$: Actions,
    private collectService: CollectService
  ) {}

  loadRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRequests),
      mergeMap(() =>
        of(this.collectService.getRequests()).pipe(
          map(requests => loadRequestsSuccess({ requests })),
          catchError(error => of(loadRequestsFailure({ error: error.message })))
        )
      )
    )
  );

  addRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRequest),
      mergeMap(({ request }) => {
        this.collectService.addRequest(request);
        return of(loadRequests());
      })
    )
  );

  updateRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateRequest),
      mergeMap(({ requestId, updates }) => {
        this.collectService.updateRequest(requestId, updates);
        return of(loadRequests());
      })
    )
  );

  deleteRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteRequest),
      mergeMap(({ requestId }) => {
        this.collectService.deleteRequest(requestId);
        return of(loadRequests());
      })
    )
  );
}
