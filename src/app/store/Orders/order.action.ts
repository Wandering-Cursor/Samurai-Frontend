import { createAction, props } from '@ngrx/store';
import { OrderModel } from './order.model';

// fetch Order data
export const fetchOrderdata = createAction('[Data] Fetch Order Table Data');
export const fetchOrderSuccess = createAction('[Data] Fetch Order Data Success', props<{ Orderdata: OrderModel[] }>());
export const fetchOrderFailure = createAction('[Data] Fetch Order Data Failure', props<{ error: string }>());


// Add Data
export const addOrderData = createAction(
    '[Data] Add OrderData',
    props<{ newData: OrderModel }>()
);
export const addOrderDataSuccess = createAction(
    '[Data] Add OrderData Success',
    props<{ newData: OrderModel }>()
);
export const addOrderDataFailure = createAction(
    '[Data] Add OrderData Failure',
    props<{ error: string }>()
);


// Update Data
export const updateOrderData = createAction(
    '[Data] Update OrderData',
    props<{ updatedData: OrderModel }>()
);
export const updateOrderDataSuccess = createAction(
    '[Data] Update OrderData Success',
    props<{ updatedData: OrderModel }>()
);
export const updateOrderDataFailure = createAction(
    '[Data] Update OrderData Failure',
    props<{ error: string }>()
);

// Delete Data
export const deleteOrderData = createAction(
    '[Data] Delete OrderData',
    props<{ id: string }>()
);
export const deleteOrderSuccess = createAction(
    '[Data] Delete OrderData Success',
    props<{ id: string }>()
);
export const deleteOrderFailure = createAction(
    '[Data] Delete OrderData Failure',
    props<{ error: string }>()
);