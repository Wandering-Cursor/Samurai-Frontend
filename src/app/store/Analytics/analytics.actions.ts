import { createAction, props } from '@ngrx/store';
import { TopPageModel, browserModel, ChartOptions } from './analytics.model';

export const fetchStatData = createAction('[Data] Fetch Stat Table Data');
export const fetchStatSuccess = createAction('[Data] Fetch Stat Data Success', props<{ browserData: browserModel[] }>());
export const fetchStatFailure = createAction('[Data] Fetch Stat Data Failure', props<{ error: string }>());

// fetchtoppagedata
export const fetchtopPageData = createAction('[Data] Fetch topPage Table Data');
export const fetchtopPageSuccess = createAction('[Data] Fetch topPage Data Success', props<{ PageData: TopPageModel[] }>());
export const fetchtopPageFailure = createAction('[Data] Fetch topPage Data Failure', props<{ error: string }>());


