import { createAction, props } from '@ngrx/store';
import { AgencieslistModel } from './agency.model';

// fetch Agencies data
export const fetchAgenciesData = createAction('[Data] Fetch Agencies Table Data');
export const fetchAgenciesSuccess = createAction('[Data] Fetch Agencies Data Success', props<{ Agenciesdata: AgencieslistModel[] }>());
export const fetchAgenciesFailure = createAction('[Data] Fetch Agencies Data Failure', props<{ error: string }>());

// Add Data
export const addAgenciesData = createAction(
    '[Data] Add AgenciesData',
    props<{ newData: AgencieslistModel }>()
);
export const addAgenciesDataSuccess = createAction(
    '[Data] Add AgenciesData Success',
    props<{ newData: AgencieslistModel }>()
);
export const addAgenciesDataFailure = createAction(
    '[Data] Add AgenciesData Failure',
    props<{ error: string }>()
);


// Update Data
export const updateAgenciesData = createAction(
    '[Data] Update AgenciesData',
    props<{ updatedData: AgencieslistModel }>()
);
export const updateAgenciesDataSuccess = createAction(
    '[Data] Update AgenciesData Success',
    props<{ updatedData: AgencieslistModel }>()
);
export const updateAgenciesDataFailure = createAction(
    '[Data] Update AgenciesData Failure',
    props<{ error: string }>()
);

// Delete Data
export const deleteAgenciesData = createAction(
    '[Data] Delete AgenciesData',
    props<{ id: string }>()
);
export const deleteAgenciesSuccess = createAction(
    '[Data] Delete AgenciesData Success',
    props<{ id: string }>()
);
export const deleteAgenciesFailure = createAction(
    '[Data] Delete AgenciesData Failure',
    props<{ error: string }>()
);