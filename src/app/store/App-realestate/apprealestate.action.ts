import { createAction, props } from '@ngrx/store';
import { EarningdataModel, EstatelistModel, ListingGridModel } from './apprealestate.model';
import { CourseModel } from '../Learning/learning.model';

// fetch listingGrid
export const fetchlistingGridData = createAction('[Data] Fetch listingGrid Table Data');
export const fetchlistingGridSuccess = createAction('[Data] Fetch listingGrid Data Success', props<{ listingGridData: EstatelistModel[] }>());
export const fetchlistingGridFailure = createAction('[Data] Fetch listingGrid Data Failure', props<{ error: string }>());

// fetch listinglistData
export const fetchlistinglistData = createAction('[Data] Fetch listinglistData  Data');
export const fetchlistinglistDataSuccess = createAction('[Data] Fetch listinglistData Data Success', props<{ listinglistData: CourseModel[] }>());
export const fetchlistinglistDataFailure = createAction('[Data] Fetch listinglistData Data Failure', props<{ error: string }>());

// fetchRealestateGridData
export const fetchRealestateGridData = createAction('[Data] Fetch listingGrid Table Data');
export const fetchRealestateGridSuccess = createAction('[Data] Fetch RealestateGrid Data Success', props<{ RealestateGridData: ListingGridModel[] }>());
export const fetchRealestateGridFailure = createAction('[Data] Fetch RealestateGrid Data Failure', props<{ error: string }>());

// fetchearningcardData
export const fetchearningcardData = createAction('[Data] Fetch listingGrid Table Data');
export const fetchearningcardSuccess = createAction('[Data] Fetch earningcard Data Success', props<{ earningcardData: ListingGridModel[] }>());
export const fetchearningcardFailure = createAction('[Data] Fetch earningcard Data Failure', props<{ error: string }>());

// fetchearningdataData
export const fetchearningdataData = createAction('[Data] Fetch listingGrid Table Data');
export const fetchearningdataSuccess = createAction('[Data] Fetch earningdata Data Success', props<{ earningdata: EarningdataModel[] }>());
export const fetchearningdataFailure = createAction('[Data] Fetch earningdata Data Failure', props<{ error: string }>());


// Add Data
export const addlistingGridData = createAction(
    '[Data] Add listingGridData',
    props<{ newData: EstatelistModel }>()
);
export const addlistingGridDataSuccess = createAction(
    '[Data] Add listingGridData Success',
    props<{ newData: EstatelistModel }>()
);
export const addlistingGridDataFailure = createAction(
    '[Data] Add listingGridData Failure',
    props<{ error: string }>()
);


// Update Data
export const updatelistingGridData = createAction(
    '[Data] Update listingGridData',
    props<{ updatedData: EstatelistModel }>()
);
export const updatelistingGridDataSuccess = createAction(
    '[Data] Update listingGridData Success',
    props<{ updatedData: EstatelistModel }>()
);
export const updatelistingGridDataFailure = createAction(
    '[Data] Update listingGridData Failure',
    props<{ error: string }>()
);

// Delete Data
export const deletelistingGridData = createAction(
    '[Data] Delete listingGridData',
    props<{ id: string }>()
);
export const deletelistingGridSuccess = createAction(
    '[Data] Delete listingGridData Success',
    props<{ id: string }>()
);
export const deletelistingGridFailure = createAction(
    '[Data] Delete listingGridData Failure',
    props<{ error: string }>()
);