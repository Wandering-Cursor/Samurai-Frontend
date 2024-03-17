import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

export const selectDataState = createFeatureSelector<ProductState>('product');

export const selectData = createSelector(
    selectDataState,
    (state: ProductState) => state.productlist
);
export const selectDataLoading = createSelector(
    selectDataState,
    (state: ProductState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: ProductState) => state.error
);
