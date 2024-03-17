import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InstructorState } from './instructor.reducer';

export const selectDataState = createFeatureSelector<InstructorState>('Instructorlist');

export const selectListData = createSelector(
    selectDataState,
    (state: InstructorState) => state.instructorlist
);
export const selectgridData = createSelector(
    selectDataState,
    (state: InstructorState) => state.instructorGrid
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: InstructorState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: InstructorState) => state.error
);


