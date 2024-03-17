import { Action, createReducer, on } from '@ngrx/store';
import { addinstructorgridDataSuccess, addinstructorlistDataSuccess, deleteinstructorgridSuccess, deleteinstructorlistSuccess, fetchinstructorListData, fetchinstructorListFailure, fetchinstructorListSuccess, fetchinstructorgridData, fetchinstructorgridFailure, fetchinstructorgridSuccess, updateinstructorgridDataSuccess, updateinstructorlistDataSuccess } from './instructor.action';
import { deleteOrderSuccess } from '../Orders/order.action';

export interface InstructorState {
    instructorlist: any[];
    instructorGrid: any[];
    loading: boolean;
    error: any;
}

export const initialState: InstructorState = {
    instructorlist: [],
    instructorGrid: [],
    loading: false,
    error: null
};

export const InstructorReducer = createReducer(

    initialState,
    on(fetchinstructorListData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchinstructorListSuccess, (state, { instructorlist }) => {
        return { ...state, instructorlist, loading: false };
    }),
    on(fetchinstructorListFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(fetchinstructorgridData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchinstructorgridSuccess, (state, { instructorGrid }) => {
        return { ...state, instructorGrid, loading: false };
    }),
    on(fetchinstructorgridFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    // List
    on(addinstructorlistDataSuccess, (state, { newData }) => {
        return { ...state, instructorlist: [newData, ...state.instructorlist], error: null };

    }),
    on(updateinstructorlistDataSuccess, (state, { updatedData }) => {
        return { ...state, instructorlist: state.instructorlist.map((instructorlist) => instructorlist.id === updatedData.id ? updatedData : instructorlist), error: null };
    }),

    on(deleteinstructorlistSuccess, (state, { id }) => {
        const updatedlist = state.instructorlist.filter((instructorlist) => !id.includes(instructorlist.id));
        return { ...state, instructorlist: updatedlist, error: null };
    }),

    // Grid
    on(addinstructorgridDataSuccess, (state, { newData }) => {
        return { ...state, instructorGrid: [newData, ...state.instructorGrid], error: null };

    }),
    on(updateinstructorgridDataSuccess, (state, { updatedData }) => {
        return { ...state, instructorGrid: state.instructorGrid.map((instructorGrid) => instructorGrid.id === updatedData.id ? updatedData : instructorGrid), error: null };
    }),

    on(deleteinstructorgridSuccess, (state, { id }) => {
        const updatedlist = state.instructorGrid.filter((instructorGrid) => !id.includes(instructorGrid.id));
        return { ...state, instructorGrid: updatedlist, error: null };
    }),

)

// Selector
export function reducer(state: InstructorState | undefined, action: Action) {
    return InstructorReducer(state, action);
}