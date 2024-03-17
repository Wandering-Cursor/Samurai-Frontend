import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CRMState } from './crm.reducer';

export const selectDataState = createFeatureSelector<CRMState>('CRMlist');

export const selectabledata = createSelector(
    selectDataState,
    (state: CRMState) => state.crmData
);
export const selectleadData = createSelector(
    selectDataState,
    (state: CRMState) => state.leadata
);
export const selectdealData = createSelector(
    selectDataState,
    (state: CRMState) => state.dealdata
);
export const selecttaskdata = createSelector(
    selectDataState,
    (state: CRMState) => state.tasksdata
);


export const selectDataLoading = createSelector(
    selectDataState,
    (state: CRMState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: CRMState) => state.error
);


