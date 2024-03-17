import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AnalyticsState } from './analytics.reducer';

export const selectDataState = createFeatureSelector<AnalyticsState>('statlist');

export const selectData = createSelector(
    selectDataState,
    (state: AnalyticsState) => state.browserData
);

export const selecttopData = createSelector(
    selectDataState,
    (state: AnalyticsState) => state.PageData
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: AnalyticsState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: AnalyticsState) => state.error
);


