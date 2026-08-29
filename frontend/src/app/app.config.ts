import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { appReducers } from './store';
import { AuthEffects } from './store/auth/auth.effects';
import { PatientsEffects } from './store/patients/patients.effects';
import { UsersEffects } from './store/users/users.effects';
import { MedicinesEffects } from './store/medicines/medicines.effects';
import { VisitsEffects } from './store/visits/visits.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideStore(appReducers),
    provideEffects([AuthEffects, PatientsEffects, UsersEffects, MedicinesEffects, VisitsEffects])
  ]
};
