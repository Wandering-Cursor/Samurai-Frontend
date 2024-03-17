import { createAction, props } from '@ngrx/store';
import { CategoryModel, CourseModel, InstructorModel } from './learning.model';

// fetch instructorData
export const fetchinstructorData = createAction('[Data] Fetch instructor Table Data');
export const fetchinstructorSuccess = createAction('[Data] Fetch instructor Data Success', props<{ instructorData: InstructorModel[] }>());
export const fetchinstructorFailure = createAction('[Data] Fetch instructor Data Failure', props<{ error: string }>());

// fetch categoryData
export const fetchrecentcourseData = createAction('[Data] Fetch recentcourse Table Data');
export const fetchrecentcourseSuccess = createAction('[Data] Fetch recentcourse Data Success', props<{ recentcourseData: CourseModel[] }>());
export const fetchrecentcourseFailure = createAction('[Data] Fetch recentcourse Data Failure', props<{ error: string }>());

// fetch category
export const fetchcategoryData = createAction('[Data] Fetch category Table Data');
export const fetchcategorySuccess = createAction('[Data] Fetch category Data Success', props<{ categoryData: CategoryModel[] }>());
export const fetchcategoryFailure = createAction('[Data] Fetch category Data Failure', props<{ error: string }>());

// Add Data
export const addCategoryData = createAction(
    '[Data] Add Category',
    props<{ newData: CategoryModel }>()
);
export const addCategorySuccess = createAction(
    '[Data] Add Category Success',
    props<{ newData: CategoryModel }>()
);
export const addCategoryFailure = createAction(
    '[Data] Add Category Failure',
    props<{ error: string }>()
);
