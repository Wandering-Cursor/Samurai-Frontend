import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { addcustomerData, addcustomerDataFailure, addcustomerDataSuccess, deletecustomerData, deletecustomerFailure, deletecustomerSuccess, fetchcustomerData, fetchcustomerFailure, fetchcustomerSuccess, updatecustomerData, updatecustomerDataFailure, updatecustomerDataSuccess } from "./customer.action";

@Injectable()

export class CustomerEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchcustomerData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/customerList').pipe(
                    map((customerdata) => fetchcustomerSuccess({ customerdata })),

                    catchError((error) =>
                        of(fetchcustomerFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addcustomerData),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/customerList', newData).pipe(
                    map(() => addcustomerDataSuccess({ newData })),
                    catchError((error) => of(addcustomerDataFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updatecustomerData),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/customerList', updatedData).pipe(
                    map(() => updatecustomerDataSuccess({ updatedData })),
                    catchError((error) => of(updatecustomerDataFailure({ error })))
                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deletecustomerData),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/customerList').pipe(
                    map(() => deletecustomerSuccess({ id })),
                    catchError((error) => of(deletecustomerFailure({ error })))
                )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}