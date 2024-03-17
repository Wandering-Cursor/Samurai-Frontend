import { Action, createReducer, on } from '@ngrx/store';
import { addlistingGridDataSuccess, deletelistingGridSuccess, fetchearningcardFailure, fetchearningdataData, fetchearningdataSuccess, fetchlistingGridData, fetchlistingGridFailure, fetchlistingGridSuccess, fetchlistinglistData, fetchlistinglistDataFailure, fetchlistinglistDataSuccess, updatelistingGridDataSuccess } from './apprealestate.action';


export interface AppRealestateState {
    listingGridData: any[];
    listinglistData: any[];
    earningdata: any[];
    loading: boolean;
    error: any;
}

export const initialState: AppRealestateState = {
    listingGridData: [],
    listinglistData: [],
    earningdata: [],
    loading: false,
    error: null
};

export const AppRealestateReducer = createReducer(

    // LISTING GRID
    initialState,
    on(fetchlistingGridData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchlistingGridSuccess, (state, { listingGridData }) => {
        return { ...state, listingGridData, loading: false };
    }),
    on(fetchlistingGridFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),
    on(addlistingGridDataSuccess, (state, { newData }) => {
        return { ...state, listingGridData: [newData, ...state.listingGridData], error: null };

    }),
    on(updatelistingGridDataSuccess, (state, { updatedData }) => {
        return { ...state, listingGridData: state.listingGridData.map((listingGridData) => listingGridData.id === updatedData.id ? updatedData : listingGridData), error: null };
    }),

    on(deletelistingGridSuccess, (state, { id }) => {
        const updatedlist = state.listingGridData.filter((listingGridData) => !id.includes(listingGridData.id));
        return { ...state, listingGridData: updatedlist, error: null };
    }),


    // LISTING LIST
    on(fetchlistinglistData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchlistinglistDataSuccess, (state, { listinglistData }) => {
        return { ...state, listinglistData, loading: false };
    }),
    on(fetchlistinglistDataFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    // LISTING GRID
    on(fetchlistingGridData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchlistingGridSuccess, (state, { listingGridData }) => {
        return { ...state, listingGridData, loading: false };
    }),
    on(fetchlistingGridFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    // earning
    on(fetchearningdataData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchearningdataSuccess, (state, { earningdata }) => {
        return { ...state, earningdata, loading: false };
    }),
    on(fetchearningcardFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),
)

// Selector
export function reducer(state: AppRealestateState | undefined, action: Action) {
    return AppRealestateReducer(state, action);
}