import { createAction, props } from '@ngrx/store';
import { ordersModel, productsModel, salesModel } from './ecommerce.model';

// fetch sales data
export const fetchsalesData = createAction('[Data] Fetch sales Table Data');
export const fetchsalesSuccess = createAction('[Data] Fetch sales Data Success', props<{ salesdata: salesModel[] }>());
export const fetchsalesFailure = createAction('[Data] Fetch sales Data Failure', props<{ error: string }>());

// fetch order data
export const fetchorderData = createAction('[Data] Fetch order Table Data');
export const fetchorderSuccess = createAction('[Data] Fetch order Data Success', props<{ orderdata: ordersModel[] }>());
export const fetchorderFailure = createAction('[Data] Fetch order Data Failure', props<{ error: string }>());

// fetch order data
export const fetchproductsData = createAction('[Data] Fetch products Table Data');
export const fetchproductsSuccess = createAction('[Data] Fetch products Data Success', props<{ productdata: productsModel[] }>());
export const fetchproductsFailure = createAction('[Data] Fetch products Data Failure', props<{ error: string }>());


