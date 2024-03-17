import { createAction, props } from '@ngrx/store';
import { sellerModel, Overviewmodel } from './seller.model';

// fetch seller data
export const fetchsellerdata = createAction('[Data] Fetch seller Table Data');
export const fetchsellerSuccess = createAction('[Data] Fetch seller Data Success', props<{ sellerdata: sellerModel[] }>());
export const fetchsellerFailure = createAction('[Data] Fetch seller Data Failure', props<{ error: string }>());

// fetch seller data
export const fetchsellerOverviewdata = createAction('[Data] Fetch seller Overview Data');
export const fetchsellerOverviewSuccess = createAction('[Data] Fetch sellerOverview Data Success', props<{ sellerOverview: Overviewmodel[] }>());
export const fetchsellerOverviewFailure = createAction('[Data] Fetch sellerOverview Data Failure', props<{ error: string }>());

// Add Data
export const addSellerdata = createAction(
    '[Data] Add SellerData',
    props<{ newData: sellerModel }>()
);
export const addSellerdataDataSuccess = createAction(
    '[Data] Add SellerData Success',
    props<{ newData: sellerModel }>()
);
export const addSellerdataDataFailure = createAction(
    '[Data] Add SellerData Failure',
    props<{ error: string }>()
);
// Add Data
export const addSellerOverviewdata = createAction(
    '[Data] Add SellerOverviewData',
    props<{ newData: sellerModel }>()
);
export const addSellerdataOverviewDataSuccess = createAction(
    '[Data] Add SellerOverviewData Success',
    props<{ newData: sellerModel }>()
);
export const addSellerdataDataOverviewFailure = createAction(
    '[Data] Add SellerOverviewData Failure',
    props<{ error: string }>()
);


// Update Data
export const updateSellerdataData = createAction(
    '[Data] Update SellerdataData',
    props<{ updatedData: sellerModel }>()
);
export const updateSellerdataDataSuccess = createAction(
    '[Data] Update SellerdataData Success',
    props<{ updatedData: sellerModel }>()
);
export const updateSellerdataDataFailure = createAction(
    '[Data] Update SellerdataData Failure',
    props<{ error: string }>()
);

// Update Data
export const updateSellerdataOverviewData = createAction(
    '[Data] Update SellerOverviewData',
    props<{ updatedData: sellerModel }>()
);
export const updateSellerdOverviewDataSuccess = createAction(
    '[Data] Update SellerOverviewData Success',
    props<{ updatedData: sellerModel }>()
);
export const updateSellerOverviewDataFailure = createAction(
    '[Data] Update SellerdOverviewData Failure',
    props<{ error: string }>()
);

// Delete Data
export const deleteSellerdataData = createAction(
    '[Data] Delete SellerdataData',
    props<{ id: string }>()
);
export const deleteSellerdataSuccess = createAction(
    '[Data] Delete SellerdataData Success',
    props<{ id: string }>()
);
export const deleteSellerdataFailure = createAction(
    '[Data] Delete SellerdataData Failure',
    props<{ error: string }>()
);
// Delete Data
export const deleteSellerOverviewData = createAction(
    '[Data] Delete SellerOverviewdataData',
    props<{ id: string }>()
);
export const deleteSellerOverviewSuccess = createAction(
    '[Data] Delete SellerOverviewdataData Success',
    props<{ id: string }>()
);
export const deleteSellerOverviewFailure = createAction(
    '[Data] Delete SellerOverviewData Failure',
    props<{ error: string }>()
);