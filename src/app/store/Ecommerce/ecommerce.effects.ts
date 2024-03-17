import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { fetchorderData, fetchorderFailure, fetchorderSuccess, fetchproductsData, fetchproductsFailure, fetchproductsSuccess, fetchsalesData, fetchsalesFailure, fetchsalesSuccess } from "./ecommerce.actions";

@Injectable()

export class ECoEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchsalesData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/sales').pipe(
                    map((salesdata) => fetchsalesSuccess({ salesdata })),

                    catchError((error) =>
                        of(fetchsalesFailure({ error }))
                    )

                )
            )
        )
    );

    fetchorderData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchorderData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/order').pipe(
                    map((orderdata) => fetchorderSuccess({ orderdata })),

                    catchError((error) =>
                        of(fetchorderFailure({ error }))
                    )

                )
            )
        )
    );
    fetchproductData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchproductsData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/products').pipe(
                    map((productdata) => fetchproductsSuccess({ productdata })),

                    catchError((error) =>
                        of(fetchproductsFailure({ error }))
                    )

                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}