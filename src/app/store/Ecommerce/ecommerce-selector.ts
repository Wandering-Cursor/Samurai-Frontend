import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ECoState } from './ecommerce.reducer';


export const selectDataState = createFeatureSelector<ECoState>('Ecommercelist');

export const selectData = createSelector(
    selectDataState,
    (state: ECoState) => state.salesdata
);

export const selectorderata = createSelector(
    selectDataState,
    (state: ECoState) => state.orderdata
);

export const selectproductData = createSelector(
    selectDataState,
    (state: ECoState) => state.productdata
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: ECoState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: ECoState) => state.error
);


