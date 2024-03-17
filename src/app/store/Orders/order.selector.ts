import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderState } from './order.reducer';

export const selectDataState = createFeatureSelector<OrderState>('Orderlist');

export const selectData = createSelector(
    selectDataState,
    (state: OrderState) => state.Orderdata
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: OrderState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: OrderState) => state.error
);

