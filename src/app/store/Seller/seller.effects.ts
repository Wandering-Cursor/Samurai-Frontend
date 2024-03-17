import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { addSellerOverviewdata, addSellerdata, addSellerdataDataFailure, addSellerdataDataOverviewFailure, addSellerdataDataSuccess, addSellerdataOverviewDataSuccess, deleteSellerdataData, deleteSellerdataFailure, deleteSellerdataSuccess, fetchsellerFailure, fetchsellerOverviewFailure, fetchsellerOverviewSuccess, fetchsellerOverviewdata, fetchsellerSuccess, fetchsellerdata, updateSellerOverviewDataFailure, updateSellerdOverviewDataSuccess, updateSellerdataData, updateSellerdataDataFailure, updateSellerdataDataSuccess, updateSellerdataOverviewData } from "./seller.action";

@Injectable()

export class SellerEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchsellerdata),
            mergeMap(() =>
                this.CrudService.fetchData('/app/seller').pipe(
                    map((sellerdata) => fetchsellerSuccess({ sellerdata })),

                    catchError((error) =>
                        of(fetchsellerFailure({ error }))
                    )

                )
            )
        )
    );
    fetchOverview$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchsellerOverviewdata),
            mergeMap(() =>
                this.CrudService.fetchData('/app/sellerOverview').pipe(
                    map((sellerOverview) => fetchsellerOverviewSuccess({ sellerOverview })),

                    catchError((error) =>
                        of(fetchsellerOverviewFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addSellerdata),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/seller', newData).pipe(
                    map(() => addSellerdataDataSuccess({ newData })),
                    catchError((error) => of(addSellerdataDataFailure({ error })))
                )
            )
        )
    );
    addoverviewData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addSellerOverviewdata),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/sellerOverview', newData).pipe(
                    map(() => addSellerdataOverviewDataSuccess({ newData })),
                    catchError((error) => of(addSellerdataDataOverviewFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateSellerdataData),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/seller', updatedData).pipe(
                    map(() => updateSellerdataDataSuccess({ updatedData })),
                    catchError((error) => of(updateSellerdataDataFailure({ error })))
                )
            )
        )
    );

    updateoverviewData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateSellerdataOverviewData),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/sellerOverview', updatedData).pipe(
                    map(() => updateSellerdOverviewDataSuccess({ updatedData })),
                    catchError((error) => of(updateSellerOverviewDataFailure({ error })))
                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteSellerdataData),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/sellerOverview').pipe(
                    map(() => deleteSellerdataSuccess({ id })),
                    catchError((error) => of(deleteSellerdataFailure({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}