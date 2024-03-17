import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { addOrderData, addOrderDataFailure, addOrderDataSuccess, deleteOrderData, deleteOrderFailure, deleteOrderSuccess, fetchOrderFailure, fetchOrderSuccess, fetchOrderdata, updateOrderData, updateOrderDataFailure, updateOrderDataSuccess } from "./order.action";

@Injectable()

export class OrdersEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchOrderdata),
            mergeMap(() =>
                this.CrudService.fetchData('/app/orderList').pipe(
                    map((Orderdata) => fetchOrderSuccess({ Orderdata })),

                    catchError((error) =>
                        of(fetchOrderFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addOrderData),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/orderList', newData).pipe(
                    map(() => addOrderDataSuccess({ newData })),
                    catchError((error) => of(addOrderDataFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateOrderData),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/orderList', updatedData).pipe(
                    map(() => updateOrderDataSuccess({ updatedData })),
                    catchError((error) => of(updateOrderDataFailure({ error })))
                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteOrderData),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/orderList').pipe(
                    map(() => deleteOrderSuccess({ id })),
                    catchError((error) => of(deleteOrderFailure({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}