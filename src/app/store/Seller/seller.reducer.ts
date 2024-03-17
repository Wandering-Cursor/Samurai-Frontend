import { Action, createReducer, on } from '@ngrx/store';
import { addSellerdataDataSuccess, addSellerdataOverviewDataSuccess, deleteSellerOverviewData, deleteSellerdataSuccess, fetchsellerFailure, fetchsellerOverviewFailure, fetchsellerOverviewSuccess, fetchsellerOverviewdata, fetchsellerSuccess, fetchsellerdata, updateSellerdOverviewDataSuccess, updateSellerdataDataSuccess } from './seller.action';

export interface SellerState {
    sellerdata: any[];
    sellerOverview: any[];
    loading: boolean;
    error: any;
}

export const initialState: SellerState = {
    sellerdata: [],
    sellerOverview: [],
    loading: false,
    error: null
};

export const SelleReducer = createReducer(

    initialState,
    on(fetchsellerdata, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchsellerSuccess, (state, { sellerdata }) => {
        return { ...state, sellerdata, loading: false };
    }),
    on(fetchsellerFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(fetchsellerOverviewdata, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchsellerOverviewSuccess, (state, { sellerOverview }) => {
        return { ...state, sellerOverview, loading: false };
    }),
    on(fetchsellerOverviewFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(addSellerdataDataSuccess, (state, { newData }) => {
        return { ...state, sellerdata: [newData, ...state.sellerdata], error: null };

    }),
    on(updateSellerdataDataSuccess, (state, { updatedData }) => {
        return { ...state, sellerdata: state.sellerdata.map((sellerdata) => sellerdata.id === updatedData.id ? updatedData : sellerdata), error: null };
    }),

    on(deleteSellerdataSuccess, (state, { id }) => {
        const updatedlist = state.sellerdata.filter((sellerdata) => sellerdata.id != id);
        return { ...state, sellerdata: updatedlist, error: null };
    }),

    on(addSellerdataOverviewDataSuccess, (state, { newData }) => {
        return { ...state, sellerOverview: [newData, ...state.sellerOverview], error: null };

    }),
    on(updateSellerdOverviewDataSuccess, (state, { updatedData }) => {
        return { ...state, sellerOverview: state.sellerOverview.map((sellerOverview) => sellerOverview.id === updatedData.id ? updatedData : sellerOverview), error: null };
    }),

    on(deleteSellerOverviewData, (state, { id }) => {
        const updatedlist = state.sellerOverview.filter((sellerOverview) => !id.includes(sellerOverview.id));
        return { ...state, sellerOverview: updatedlist, error: null };
    }),
)

// Selector
export function reducer(state: SellerState | undefined, action: Action) {
    return SelleReducer(state, action);
}