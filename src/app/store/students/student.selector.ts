import { createFeatureSelector, createSelector } from '@ngrx/store';
import { studentState } from './student.reducer';

export const selectDataState = createFeatureSelector<studentState>('SubscriptionList');

export const selectData = createSelector(
    selectDataState,
    (state: studentState) => state.Subscriptiondata
);
export const selectCoucesData = createSelector(
    selectDataState,
    (state: studentState) => state.Courcesdata
);


export const selectDataLoading = createSelector(
    selectDataState,
    (state: studentState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: studentState) => state.error
);

