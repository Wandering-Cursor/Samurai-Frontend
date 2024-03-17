import { createAction, props } from '@ngrx/store';
import { CourcesModel, SubscriptionModel } from './student.model';

// fetch Subscription data
export const fetchSubscriptiondata = createAction('[Data] Fetch Subscription Table Data');
export const fetchSubscriptionSuccess = createAction('[Data] Fetch Subscription Data Success', props<{ Subscriptiondata: SubscriptionModel[] }>());
export const fetchSubscriptionFailure = createAction('[Data] Fetch Subscription Data Failure', props<{ error: string }>());

// fetch Subscription data
export const fetchCourcesdata = createAction('[Data] Fetch Cources Table Data');
export const fetchCourcesSuccess = createAction('[Data] Fetch Cources Data Success', props<{ Courcesdata: CourcesModel[] }>());
export const fetchCourcesFailure = createAction('[Data] Fetch Cources Data Failure', props<{ error: string }>());