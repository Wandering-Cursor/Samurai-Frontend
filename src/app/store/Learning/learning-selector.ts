import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LearningState } from './learning.reducer';

export const selectDataState = createFeatureSelector<LearningState>('Learninglist');

export const selectData = createSelector(
    selectDataState,
    (state: LearningState) => state.instructorData
);

export const selectrecentData = createSelector(
    selectDataState,
    (state: LearningState) => state.recentcourseData
);
export const selectcategoryData = createSelector(
    selectDataState,
    (state: LearningState) => state.categoryData
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: LearningState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: LearningState) => state.error
);


