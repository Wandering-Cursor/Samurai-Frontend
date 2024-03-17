import { createAction, props } from '@ngrx/store';
import { customerModel } from './customer.model';

// fetch customer data
export const fetchcustomerData = createAction('[Data] Fetch customer Table Data');
export const fetchcustomerSuccess = createAction('[Data] Fetch customer Data Success', props<{ customerdata: customerModel[] }>());
export const fetchcustomerFailure = createAction('[Data] Fetch customer Data Failure', props<{ error: string }>());

// Add Data
export const addcustomerData = createAction(
    '[Data] Add customerData',
    props<{ newData: customerModel }>()
);
export const addcustomerDataSuccess = createAction(
    '[Data] Add customerData Success',
    props<{ newData: customerModel }>()
);
export const addcustomerDataFailure = createAction(
    '[Data] Add customerData Failure',
    props<{ error: string }>()
);


// Update Data
export const updatecustomerData = createAction(
    '[Data] Update customerData',
    props<{ updatedData: customerModel }>()
);
export const updatecustomerDataSuccess = createAction(
    '[Data] Update customerData Success',
    props<{ updatedData: customerModel }>()
);
export const updatecustomerDataFailure = createAction(
    '[Data] Update customerData Failure',
    props<{ error: string }>()
);

// Delete Data
export const deletecustomerData = createAction(
    '[Data] Delete customerData',
    props<{ id: string }>()
);
export const deletecustomerSuccess = createAction(
    '[Data] Delete customerData Success',
    props<{ id: string }>()
);
export const deletecustomerFailure = createAction(
    '[Data] Delete customerData Failure',
    props<{ error: string }>()
);