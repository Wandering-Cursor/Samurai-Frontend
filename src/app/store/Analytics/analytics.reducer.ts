import { Action, createReducer, on } from '@ngrx/store';
import { fetchStatData, fetchStatFailure, fetchStatSuccess, fetchtopPageData, fetchtopPageFailure, fetchtopPageSuccess } from './analytics.actions';


export interface AnalyticsState {
    browserData: any[];
    PageData: any[];
    loading: boolean;
    error: any;
}

export const initialState: AnalyticsState = {
    browserData: [],
    PageData: [],
    loading: false,
    error: null
};

export const AnalyticsReducer = createReducer(

    initialState,
    on(fetchStatData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchStatSuccess, (state, { browserData }) => {
        return { ...state, browserData, loading: false };
    }),
    on(fetchStatFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(fetchtopPageData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchtopPageSuccess, (state, { PageData }) => {
        return { ...state, PageData, loading: false };
    }),
    on(fetchtopPageFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),
)

// Selector
export function reducer(state: AnalyticsState | undefined, action: Action) {
    return AnalyticsReducer(state, action);
}