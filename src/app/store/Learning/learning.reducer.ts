import { Action, createReducer, on } from '@ngrx/store';
import { addCategorySuccess, fetchcategoryData, fetchcategoryFailure, fetchcategorySuccess, fetchinstructorData, fetchinstructorFailure, fetchinstructorSuccess, fetchrecentcourseData, fetchrecentcourseFailure, fetchrecentcourseSuccess } from './learning.action';


export interface LearningState {
    recentcourseData: any[];
    instructorData: any[];
    categoryData: any[];
    loading: boolean;
    error: any;
}

export const initialState: LearningState = {
    recentcourseData: [],
    instructorData: [],
    categoryData: [],
    loading: false,
    error: null
};

export const LearningReducer = createReducer(

    initialState,
    on(fetchinstructorData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchinstructorSuccess, (state, { instructorData }) => {
        return { ...state, instructorData, loading: false };
    }),
    on(fetchinstructorFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(fetchcategoryData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchcategorySuccess, (state, { categoryData }) => {
        return { ...state, categoryData, loading: false };
    }),
    on(fetchcategoryFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(fetchrecentcourseData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchrecentcourseSuccess, (state, { recentcourseData }) => {
        return { ...state, recentcourseData, loading: false };
    }),
    on(fetchrecentcourseFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),
    on(addCategorySuccess, (state, { newData }) => {
        return { ...state, categoryData: [newData, ...state.categoryData], error: null };
    }),
)

// Selector
export function reducer(state: LearningState | undefined, action: Action) {
    return LearningReducer(state, action);
}