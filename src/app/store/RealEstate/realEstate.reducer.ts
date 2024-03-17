import { Action, createReducer, on } from '@ngrx/store';
import { fetchfeedbackdataData, fetchfeedbackdataFailure, fetchfeedbackdataSuccess, fetchpropertydataData, fetchpropertydataFailure, fetchpropertydataSuccess, fetchrentproprtydataData, fetchrentproprtydataFailure, fetchrentproprtydataSuccess, fetchsalepropertydataData, fetchsalepropertydataFailure, fetchsalepropertydataSuccess } from './realEstate.action';

export interface RealState {
    propertydata: any[];
    feedbackdata: any[];
    salepropertydata: any[];
    rentproprtydata: any[];
    loading: boolean;
    error: any;
}

export const initialState: RealState = {
    propertydata: [],
    feedbackdata: [],
    salepropertydata: [],
    rentproprtydata: [],
    loading: false,
    error: null
};

export const RealReducer = createReducer(

    initialState,
    on(fetchpropertydataData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchpropertydataSuccess, (state, { propertydata }) => {
        return { ...state, propertydata, loading: false };
    }),
    on(fetchpropertydataFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(fetchfeedbackdataData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchfeedbackdataSuccess, (state, { feedbackdata }) => {
        return { ...state, feedbackdata, loading: false };
    }),
    on(fetchfeedbackdataFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(fetchsalepropertydataData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchsalepropertydataSuccess, (state, { salepropertydata }) => {
        return { ...state, salepropertydata, loading: false };
    }),

    on(fetchsalepropertydataFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(fetchrentproprtydataData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchrentproprtydataSuccess, (state, { rentproprtydata }) => {
        return { ...state, rentproprtydata, loading: false };
    }),
    on(fetchrentproprtydataFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),
)

// Selector
export function reducer(state: RealState | undefined, action: Action) {
    return RealReducer(state, action);
}