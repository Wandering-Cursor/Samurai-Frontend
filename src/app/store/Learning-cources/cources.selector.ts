import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourcesState } from './cources.reducer';
export const selectDataState = createFeatureSelector<CourcesState>('CourcesList');

export const selectData = createSelector(
    selectDataState,
    (state: CourcesState) => state.courcelistdata
);
export const selectgridData = createSelector(
    selectDataState,
    (state: CourcesState) => state.Griddata
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: CourcesState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: CourcesState) => state.error
);


