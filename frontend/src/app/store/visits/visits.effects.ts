import { Injectable, inject } from '@angular/core';
import { Actions as NgRxActions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { VisitService } from '../../core/services/visit-service';
import { IVisitListModel } from '../../core/models/interfaces/IVisit.Model';
import * as VisitActions from './visits.actions';
@Injectable()
export class VisitsEffects {
  private actions$ = inject(NgRxActions);
  private service = inject(VisitService);
  load$ = createEffect(() => this.actions$.pipe(ofType(VisitActions.loadVisits), exhaustMap(() => this.service.getVisitsList().pipe(map((visits) => VisitActions.visitsSuccess({ visits })), catchError((error) => of(VisitActions.visitsFailure({ error: error?.message || 'Unable to load visits' })))))));
  create$ = createEffect(() => this.actions$.pipe(ofType(VisitActions.createVisit), exhaustMap(({ visit }) => this.service.createVisit(visit).pipe(map((created) => VisitActions.createVisitSuccess({ visit: created as IVisitListModel }))))));
}
