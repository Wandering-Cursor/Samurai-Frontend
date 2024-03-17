import { createAction, props } from '@ngrx/store';
import { dealModel, leadModel, tableModel, taskModel } from './crm.model';

export const fetchtableData = createAction('[Data] Fetch table Data');
export const fetchtableSuccess = createAction('[Data] Fetch table Data Success', props<{ crmData: tableModel[] }>());
export const fetchtableFailure = createAction('[Data] Fetch table Data Failure', props<{ error: string }>());

export const fetchleadData = createAction('[Data] Fetch lead Data');
export const fetchleadSuccess = createAction('[Data] Fetch lead Data Success', props<{ leadata: leadModel[] }>());
export const fetchleadFailure = createAction('[Data] Fetch lead Data Failure', props<{ error: string }>());

export const fetchdealData = createAction('[Data] Fetch deal Data');
export const fetchdealSuccess = createAction('[Data] Fetch deal Data Success', props<{ dealdata: dealModel[] }>());
export const fetchdealFailure = createAction('[Data] Fetch deal Data Failure', props<{ error: string }>());

export const fetchtaksData = createAction('[Data] Fetch tasks Data');
export const fetchtasksSuccess = createAction('[Data] Fetch tasks Data Success', props<{ tasksdata: taskModel[] }>());
export const fetchtasksFailure = createAction('[Data] Fetch tasks Data Failure', props<{ error: string }>());



