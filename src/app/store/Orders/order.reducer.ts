import { Action, createReducer, on } from '@ngrx/store';
import { fetchorderData, fetchorderFailure, fetchorderSuccess } from '../Ecommerce/ecommerce.actions';
import { addOrderDataSuccess, deleteOrderSuccess, fetchOrderSuccess, updateOrderDataSuccess } from './order.action';

export interface OrderState {
    Orderdata: any[];
    loading: boolean;
    error: any;
}

export const initialState: OrderState = {
    Orderdata: [],
    loading: false,
    error: null
};

export const OrderReducer = createReducer(

    initialState,
    on(fetchorderData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchOrderSuccess, (state, { Orderdata }) => {
        return { ...state, Orderdata, loading: false };
    }),
    on(fetchorderFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),
    on(addOrderDataSuccess, (state, { newData }) => {
        return { ...state, Orderdata: [newData, ...state.Orderdata], error: null };
    }),
    on(updateOrderDataSuccess, (state, { updatedData }) => {
        return { ...state, Orderdata: state.Orderdata.map((Orderdata) => Orderdata.id === updatedData.id ? updatedData : Orderdata), error: null };
    }),

    on(deleteOrderSuccess, (state, { id }) => {
        const updatedlist = state.Orderdata.filter((Orderdata) => !id.includes(Orderdata.id));
        return { ...state, Orderdata: updatedlist, error: null };
    }),

)

// Selector
export function reducer(state: OrderState | undefined, action: Action) {
    return OrderReducer(state, action);
}