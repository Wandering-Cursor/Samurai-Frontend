import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from './customer.reducer';


export const selectDataState = createFeatureSelector<CustomerState>('CustomerList');

export const selectData = createSelector(
    selectDataState,
    (state: CustomerState) => state.customerdata
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: CustomerState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: CustomerState) => state.error
);

