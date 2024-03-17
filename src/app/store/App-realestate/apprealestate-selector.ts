import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppRealestateState } from './apprealestate.reducer';

export const selectDataState = createFeatureSelector<AppRealestateState>('Apprealestate');

export const selectData = createSelector(
    selectDataState,
    (state: AppRealestateState) => state.listingGridData
);

export const selectlistingdata = createSelector(
    selectDataState,
    (state: AppRealestateState) => state.listinglistData
);
export const selectearningdata = createSelector(
    selectDataState,
    (state: AppRealestateState) => state.earningdata
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: AppRealestateState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: AppRealestateState) => state.error
);


