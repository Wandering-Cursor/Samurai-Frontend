import { Action, createReducer, on } from '@ngrx/store';
import { addcustomerDataSuccess, deletecustomerSuccess, fetchcustomerData, fetchcustomerFailure, fetchcustomerSuccess, updatecustomerDataSuccess } from './customer.action';



export interface CustomerState {
    customerdata: any[];
    loading: boolean;
    error: any;
}

export const initialState: CustomerState = {
    customerdata: [],
    loading: false,
    error: null
};

export const CustomerReducer = createReducer(

    initialState,
    on(fetchcustomerData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchcustomerSuccess, (state, { customerdata }) => {
        return { ...state, customerdata, loading: false };
    }),
    on(fetchcustomerFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(addcustomerDataSuccess, (state, { newData }) => {
        return { ...state, customerdata: [newData, ...state.customerdata], error: null };

    }),
    on(updatecustomerDataSuccess, (state, { updatedData }) => {
        return { ...state, customerdata: state.customerdata.map((customerdata) => customerdata.id === updatedData.id ? updatedData : customerdata), error: null };
    }),

    on(deletecustomerSuccess, (state, { id }) => {
        return { ...state, customerdata: state.customerdata.filter((customerdata) => customerdata.id !== id), error: null }
    }),

)

// Selector
export function reducer(state: CustomerState | undefined, action: Action) {
    return CustomerReducer(state, action);
}