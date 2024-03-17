import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RealState } from './realEstate.reducer';

export const selectDataState = createFeatureSelector<RealState>('Realist');

export const selectData = createSelector(
    selectDataState,
    (state: RealState) => state.propertydata
);

export const selectfeedData = createSelector(
    selectDataState,
    (state: RealState) => state.feedbackdata
);
export const selectsaleData = createSelector(
    selectDataState,
    (state: RealState) => state.salepropertydata
);

export const selectrentData = createSelector(
    selectDataState,
    (state: RealState) => state.rentproprtydata
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: RealState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: RealState) => state.error
);


