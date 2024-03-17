import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AgenciesState } from './agency.reducer';

export const selectDataState = createFeatureSelector<AgenciesState>('Agenciesdata');

export const selectData = createSelector(
    selectDataState,
    (state: AgenciesState) => state.Agenciesdata
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: AgenciesState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: AgenciesState) => state.error
);


