import { Action, createReducer, on } from '@ngrx/store';
import { deleteinvoiceSuccess, fetchInvoiceData, fetchInvoiceFailure, fetchInvoiceSuccess, fetchInvoicelistData, fetchInvoicelistFailure, fetchInvoicelistSuccess } from './invoices.action';

export interface InvoiceState {
    Invoicelistdata: any[];
    Invoicedata: any[];
    loading: boolean;
    error: any;
}

export const initialState: InvoiceState = {
    Invoicelistdata: [],
    Invoicedata: [],
    loading: false,
    error: null
};

export const InvoiceReducer = createReducer(
    initialState,
    on(fetchInvoicelistData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchInvoicelistSuccess, (state, { Invoicelistdata }) => {
        return { ...state, Invoicelistdata, loading: false };
    }),
    on(fetchInvoicelistFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(fetchInvoiceData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchInvoiceSuccess, (state, { Invoicedata }) => {
        return { ...state, Invoicedata, loading: false };
    }),
    on(fetchInvoiceFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(deleteinvoiceSuccess, (state, { id }) => {
        const updatedlist = state.Invoicelistdata.filter((Invoicelistdata) => !id.includes(Invoicelistdata.id));
        return { ...state, Invoicelistdata: updatedlist, error: null };
    }),
)

// Selector
export function reducer(state: InvoiceState | undefined, action: Action) {
    return InvoiceReducer(state, action);
}