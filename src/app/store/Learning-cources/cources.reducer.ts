import { Action, createReducer, on } from '@ngrx/store';
import { addcourcegridDataSuccess, addcourcelistDataSuccess, deletecourcegridSuccess, deletecourcelistSuccess, fetchcourcegridFailure, fetchcourcegridSuccess, fetchcourcegriddata, fetchcourcelistFailure, fetchcourcelistSuccess, fetchcourcelistdata, updatecourcegridDataSuccess, updatecourcelistDataSuccess } from './cources.action';

export interface CourcesState {
    courcelistdata: any[];
    Griddata: any[];
    loading: boolean;
    error: any;
}

export const initialState: CourcesState = {
    courcelistdata: [],
    Griddata: [],
    loading: false,
    error: null
};

export const CourcesReducer = createReducer(

    initialState,
    on(fetchcourcelistdata, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchcourcelistSuccess, (state, { courcelistdata }) => {
        return { ...state, courcelistdata, loading: false };
    }),
    on(fetchcourcelistFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),
    on(addcourcelistDataSuccess, (state, { newData }) => {
        return { ...state, courcelistdata: [newData, ...state.courcelistdata], error: null };

    }),
    on(updatecourcelistDataSuccess, (state, { updatedData }) => {
        return { ...state, courcelistdata: state.courcelistdata.map((courcelistdata) => courcelistdata.id === updatedData.id ? updatedData : courcelistdata), error: null };
    }),

    on(deletecourcelistSuccess, (state, { id }) => {
        const updatedlist = state.courcelistdata.filter((courcelistdata) => !id.includes(courcelistdata.id));
        return { ...state, courcelistdata: updatedlist, error: null };
    }),

    on(fetchcourcegriddata, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchcourcegridSuccess, (state, { Griddata }) => {
        return { ...state, Griddata, loading: false };
    }),
    on(fetchcourcegridFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),
    on(addcourcegridDataSuccess, (state, { newData }) => {
        return { ...state, Griddata: [newData, ...state.Griddata], error: null };

    }),
    on(updatecourcegridDataSuccess, (state, { updatedData }) => {
        return { ...state, Griddata: state.Griddata.map((Griddata) => Griddata.id === updatedData.id ? updatedData : Griddata), error: null };
    }),

    on(deletecourcegridSuccess, (state, { id }) => {
        const updatedgrid = state.Griddata.filter((Griddata) => Griddata.id != id);
        return { ...state, Griddata: updatedgrid, error: null };
    }),

)

// Selector
export function reducer(state: CourcesState | undefined, action: Action) {
    return CourcesReducer(state, action);
}