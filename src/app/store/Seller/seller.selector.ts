import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SellerState } from './seller.reducer';

export const selectDataState = createFeatureSelector<SellerState>('Sellerlist');

export const selectData = createSelector(
    selectDataState,
    (state: SellerState) => state.sellerdata
);

export const selectoverviewData = createSelector(
    selectDataState,
    (state: SellerState) => state.sellerOverview
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: SellerState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: SellerState) => state.error
);

