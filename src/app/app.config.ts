import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {appReducers} from './store/app.reducer';
import {provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {AuthEffects} from './store/auth/auth.effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(ReactiveFormsModule),
    provideStore(appReducers),
    provideEffects([AuthEffects]),
    provideStoreDevtools({ maxAge: 25 })
  ]
};
