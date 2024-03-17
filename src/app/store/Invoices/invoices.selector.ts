import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoiceState } from './invoices.reducer';

export const selectDataState = createFeatureSelector<InvoiceState>('Invoice');

export const selectlistData = createSelector(
    selectDataState,
    (state: InvoiceState) => state.Invoicelistdata
);
export const selectData = createSelector(
    selectDataState,
    (state: InvoiceState) => state.Invoicedata
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: InvoiceState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: InvoiceState) => state.error
);


