import { Action, createReducer, on } from '@ngrx/store';
import { addAgenciesDataSuccess, deleteAgenciesSuccess, fetchAgenciesData, fetchAgenciesFailure, fetchAgenciesSuccess, updateAgenciesDataSuccess } from './agency.action';


export interface AgenciesState {
    Agenciesdata: any[];
    loading: boolean;
    error: any;
}

export const initialState: AgenciesState = {
    Agenciesdata: [],
    loading: false,
    error: null
};

export const AgenciesReducer = createReducer(

    initialState,
    on(fetchAgenciesData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchAgenciesSuccess, (state, { Agenciesdata }) => {
        return { ...state, Agenciesdata, loading: false };
    }),
    on(fetchAgenciesFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(addAgenciesDataSuccess, (state, { newData }) => {
        return { ...state, Agenciesdata: [newData, ...state.Agenciesdata], error: null };

    }),
    on(updateAgenciesDataSuccess, (state, { updatedData }) => {
        return { ...state, Agenciesdata: state.Agenciesdata.map((Agenciesdata) => Agenciesdata.id === updatedData.id ? updatedData : Agenciesdata), error: null };
    }),

    on(deleteAgenciesSuccess, (state, { id }) => {
        const updatedlist = state.Agenciesdata.filter((Agenciesdata) => !id.includes(Agenciesdata.id));
        return { ...state, Agenciesdata: updatedlist, error: null };
    }),

)

// Selector
export function reducer(state: AgenciesState | undefined, action: Action) {
    return AgenciesReducer(state, action);
}