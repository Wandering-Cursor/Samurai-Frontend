import { createAction, props } from '@ngrx/store';
import { Feedback, Property, RentProperty, SaleProperty } from './realEstate.model';


// fetch propertydata
export const fetchpropertydataData = createAction('[Data] Fetch propertydata Table Data');
export const fetchpropertydataSuccess = createAction('[Data] Fetch propertydata Data Success', props<{ propertydata: Property[] }>());
export const fetchpropertydataFailure = createAction('[Data] Fetch propertydata Data Failure', props<{ error: string }>());

// fetch feedbackdata
export const fetchfeedbackdataData = createAction('[Data] Fetch feedbackdata Table Data');
export const fetchfeedbackdataSuccess = createAction('[Data] Fetch feedbackdata Data Success', props<{ feedbackdata: Feedback[] }>());
export const fetchfeedbackdataFailure = createAction('[Data] Fetch feedbackdata Data Failure', props<{ error: string }>());

// fetch salepropertydatas
export const fetchsalepropertydataData = createAction('[Data] Fetch salepropertydata Table Data');
export const fetchsalepropertydataSuccess = createAction('[Data] Fetch salepropertydata Data Success', props<{ salepropertydata: SaleProperty[] }>());
export const fetchsalepropertydataFailure = createAction('[Data] Fetch salepropertydata Data Failure', props<{ error: string }>());

// fetch rentproprtydata
export const fetchrentproprtydataData = createAction('[Data] Fetch rentproprtydata Table Data');
export const fetchrentproprtydataSuccess = createAction('[Data] Fetch rentproprtydata Data Success', props<{ rentproprtydata: RentProperty[] }>());
export const fetchrentproprtydataFailure = createAction('[Data] Fetch rentproprtydata Data Failure', props<{ error: string }>());
