import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadRequests, loadRequestsSuccess, loadRequestsFailure } from './collect.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {CollectService} from '../../services/collect/collect.service';

@Injectable()
export class CollectEffects {
  constructor(private actions$: Actions, private collectService: CollectService) {}

  loadRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRequests),
      mergeMap(() =>
        this.collectService.getRequests().pipe(
          map((requests) => loadRequestsSuccess({ requests })),
          catchError((error) => of(loadRequestsFailure({ error: error.message })))
        )
      )
    )
  );
}
