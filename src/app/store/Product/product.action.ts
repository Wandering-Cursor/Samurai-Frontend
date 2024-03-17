import { createAction, props } from '@ngrx/store';
import { productModel } from './product.model';

export const fetchproductsList = createAction('[Data] Fetch products List');
export const fetchproductsListSuccess = createAction('[Data] Fetch products List Success', props<{ productlist: productModel[] }>());
export const fetchproductsListFailure = createAction('[Data] Fetch products List Failure', props<{ error: string }>());

// Add Data
export const addproductsList = createAction(
    '[Data] Add productsList',
    props<{ newData: productModel }>()
);
export const addproductsListSuccess = createAction(
    '[Data] Add productsList Success',
    props<{ newData: productModel }>()
);
export const addproductsListFailure = createAction(
    '[Data] Add productsList Failure',
    props<{ error: string }>()
);


// Update Data
export const updateproductLists = createAction(
    '[Data] Update productsList',
    props<{ updatedData: productModel }>()
);
export const updateproductsListSuccess = createAction(
    '[Data] Update productsList Success',
    props<{ updatedData: productModel }>()
);
export const updateproductsListFailure = createAction(
    '[Data] Update productsList Failure',
    props<{ error: string }>()
);

// Delete Data
export const deleteproductsList = createAction(
    '[Data] Delete productsList',
    props<{ id: string }>()
);
export const deleteproductsListSuccess = createAction(
    '[Data] Delete productsList Success',
    props<{ id: string }>()
);
export const deleteproductsListFailure = createAction(
    '[Data] Delete productsList Failure',
    props<{ error: string }>()
);