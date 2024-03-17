import { Action, createReducer, on } from '@ngrx/store';
import { fetchdealData, fetchdealFailure, fetchdealSuccess, fetchleadData, fetchleadFailure, fetchleadSuccess, fetchtableData, fetchtableFailure, fetchtableSuccess, fetchtaksData, fetchtasksFailure, fetchtasksSuccess } from './crm.actions';


export interface CRMState {
    crmData: any[];
    leadata: any[];
    dealdata: any[];
    tasksdata: any[];
    loading: boolean;
    error: any;
}

export const initialState: CRMState = {
    crmData: [],
    leadata: [],
    dealdata: [],
    tasksdata: [],
    loading: false,
    error: null
};

export const CRMReducer = createReducer(

    initialState,
    on(fetchtableData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchtableSuccess, (state, { crmData }) => {
        return { ...state, crmData, loading: false };
    }),
    on(fetchtableFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(fetchleadData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchleadSuccess, (state, { leadata }) => {
        return { ...state, leadata, loading: false };
    }),
    on(fetchleadFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(fetchdealData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchdealSuccess, (state, { dealdata }) => {
        return { ...state, dealdata, loading: false };
    }),
    on(fetchdealFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(fetchtaksData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchtasksSuccess, (state, { tasksdata }) => {
        return { ...state, tasksdata, loading: false };
    }),
    on(fetchtasksFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

)

// Selector
export function reducer(state: CRMState | undefined, action: Action) {
    return CRMReducer(state, action);
}