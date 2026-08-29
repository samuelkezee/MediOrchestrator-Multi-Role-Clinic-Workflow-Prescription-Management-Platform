import { createAction, props } from '@ngrx/store';
import { IVisitListModel, IVisitModel } from '../../core/models/interfaces/IVisit.Model';
export const loadVisits = createAction('[Visits] Load');
export const visitsSuccess = createAction('[Visits API] Load Success', props<{ visits: IVisitListModel[] }>());
export const visitsFailure = createAction('[Visits API] Load Failure', props<{ error: string }>());
export const createVisit = createAction('[Visits] Create', props<{ visit: IVisitModel }>());
export const createVisitSuccess = createAction('[Visits API] Create Success', props<{ visit: IVisitListModel }>());
export interface VisitsState { items: IVisitListModel[]; loading: boolean; error: string | null; }
