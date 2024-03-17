import { Action, createReducer, on } from '@ngrx/store';
import { fetchCourcesFailure, fetchCourcesSuccess, fetchCourcesdata, fetchSubscriptionFailure, fetchSubscriptionSuccess, fetchSubscriptiondata } from './student.action';

export interface studentState {
    Subscriptiondata: any[];
    Courcesdata: any[];
    loading: boolean;
    error: any;
}

export const initialState: studentState = {
    Subscriptiondata: [],
    Courcesdata: [],
    loading: false,
    error: null
};

export const StudentsReducer = createReducer(

    initialState,
    on(fetchSubscriptiondata, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchSubscriptionSuccess, (state, { Subscriptiondata }) => {
        return { ...state, Subscriptiondata, loading: false };
    }),
    on(fetchSubscriptionFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),
    on(fetchCourcesdata, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchCourcesSuccess, (state, { Courcesdata }) => {
        return { ...state, Courcesdata, loading: false };
    }),
    on(fetchCourcesFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),
)

// Selector
export function reducer(state: studentState | undefined, action: Action) {
    return StudentsReducer(state, action);
}