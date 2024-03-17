import { createAction, props } from '@ngrx/store';
import { CourseDetailModel, GridModel } from './cources.model';

// fetch courcelist data
export const fetchcourcelistdata = createAction('[Data] Fetch courcelist Table Data');
export const fetchcourcelistSuccess = createAction('[Data] Fetch courcelist Data Success', props<{ courcelistdata: CourseDetailModel[] }>());
export const fetchcourcelistFailure = createAction('[Data] Fetch courcelist Data Failure', props<{ error: string }>());

// fetch courcelist data
export const fetchcourcegriddata = createAction('[Data] Fetch courcegrid Table Data');
export const fetchcourcegridSuccess = createAction('[Data] Fetch courcegrid Data Success', props<{ Griddata: GridModel[] }>());
export const fetchcourcegridFailure = createAction('[Data] Fetch courcegrid Data Failure', props<{ error: string }>());


// Add Data
export const addcourcelistData = createAction(
    '[Data] Add courcelistData',
    props<{ newData: CourseDetailModel }>()
);
export const addcourcelistDataSuccess = createAction(
    '[Data] Add courcelistData Success',
    props<{ newData: CourseDetailModel }>()
);
export const addcourcelistDataFailure = createAction(
    '[Data] Add courcelistData Failure',
    props<{ error: string }>()
);


// Update Data
export const updatecourcelistData = createAction(
    '[Data] Update courcelistData',
    props<{ updatedData: CourseDetailModel }>()
);
export const updatecourcelistDataSuccess = createAction(
    '[Data] Update courcelistData Success',
    props<{ updatedData: CourseDetailModel }>()
);
export const updatecourcelistDataFailure = createAction(
    '[Data] Update courcelistData Failure',
    props<{ error: string }>()
);

// Delete Data
export const deletecourcelistData = createAction(
    '[Data] Delete courcelistData',
    props<{ id: string }>()
);
export const deletecourcelistSuccess = createAction(
    '[Data] Delete courcelistData Success',
    props<{ id: string }>()
);
export const deletecourcelistFailure = createAction(
    '[Data] Delete courcelistData Failure',
    props<{ error: string }>()
);

// Add Data
export const addcourcegridData = createAction(
    '[Data] Add courcegridData',
    props<{ newData: GridModel }>()
);
export const addcourcegridDataSuccess = createAction(
    '[Data] Add courcegridData Success',
    props<{ newData: GridModel }>()
);
export const addcourcegridDataFailure = createAction(
    '[Data] Add courcegridData Failure',
    props<{ error: string }>()
);


// Update Data
export const updatecourcegridData = createAction(
    '[Data] Update courcegridData',
    props<{ updatedData: GridModel }>()
);
export const updatecourcegridDataSuccess = createAction(
    '[Data] Update courcegridData Success',
    props<{ updatedData: GridModel }>()
);
export const updatecourcegridDataFailure = createAction(
    '[Data] Update courcegridData Failure',
    props<{ error: string }>()
);

// Delete Data
export const deletecourcegridData = createAction(
    '[Data] Delete courcegridData',
    props<{ id: string }>()
);
export const deletecourcegridSuccess = createAction(
    '[Data] Delete courcegridData Success',
    props<{ id: string }>()
);
export const deletecourcegridFailure = createAction(
    '[Data] Delete courcegridData Failure',
    props<{ error: string }>()
);