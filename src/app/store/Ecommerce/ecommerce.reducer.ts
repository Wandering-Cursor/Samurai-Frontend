import { Action, createReducer, on } from '@ngrx/store';
import { fetchorderData, fetchorderFailure, fetchorderSuccess, fetchproductsData, fetchproductsFailure, fetchproductsSuccess, fetchsalesData, fetchsalesFailure, fetchsalesSuccess } from './ecommerce.actions';

export interface ECoState {
    salesdata: any[];
    orderdata: any[];
    productdata: any[];
    loading: boolean;
    error: any;
}

export const initialState: ECoState = {
    salesdata: [],
    orderdata: [],
    productdata: [],
    loading: false,
    error: null
};

export const ECoReducer = createReducer(

    initialState,
    on(fetchsalesData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchsalesSuccess, (state, { salesdata }) => {
        return { ...state, salesdata, loading: false };
    }),
    on(fetchsalesFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(fetchorderData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchorderSuccess, (state, { orderdata }) => {
        return { ...state, orderdata, loading: false };
    }),
    on(fetchorderFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(fetchproductsData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchproductsSuccess, (state, { productdata }) => {
        return { ...state, productdata, loading: false };
    }),
    on(fetchproductsFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),
)

// Selector
export function reducer(state: ECoState | undefined, action: Action) {
    return ECoReducer(state, action);
}