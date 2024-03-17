import { Action, createReducer, on } from '@ngrx/store';
import { addproductsListSuccess, deleteproductsListSuccess, fetchproductsList, fetchproductsListFailure, fetchproductsListSuccess, updateproductsListSuccess } from './product.action';

export interface ProductState {
    productlist: any[];
    loading: boolean;
    error: any;
}

export const initialState: ProductState = {
    productlist: [],
    loading: false,
    error: null
};

export const ProductReducer = createReducer(
    initialState,
    on(fetchproductsList, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchproductsListSuccess, (state, { productlist }) => {
        return { ...state, productlist, loading: false };
    }),
    on(fetchproductsListFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(addproductsListSuccess, (state, { newData }) => {
        return { ...state, productlist: [newData, ...state.productlist], error: null };

    }),
    on(updateproductsListSuccess, (state, { updatedData }) => {
        return { ...state, productsdata: state.productlist.map((productlist) => productlist.id === updatedData.id ? updatedData : productlist), error: null };
    }),

    on(deleteproductsListSuccess, (state, { id }) => {
        const updatedlist = state.productlist.filter((productlist) => !id.includes(productlist.id));
        return { ...state, productlist: updatedlist, error: null };
    }),
)

// Selector
export function reducer(state: ProductState | undefined, action: Action) {
    return ProductReducer(state, action);
}