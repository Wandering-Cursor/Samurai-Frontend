import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { addcourcegridData, addcourcegridDataFailure, addcourcegridDataSuccess, addcourcelistData, addcourcelistDataFailure, addcourcelistDataSuccess, deletecourcegridData, deletecourcegridFailure, deletecourcegridSuccess, deletecourcelistData, deletecourcelistFailure, deletecourcelistSuccess, fetchcourcegridFailure, fetchcourcegridSuccess, fetchcourcegriddata, fetchcourcelistFailure, fetchcourcelistSuccess, fetchcourcelistdata, updatecourcegridData, updatecourcegridDataFailure, updatecourcegridDataSuccess, updatecourcelistData, updatecourcelistDataFailure, updatecourcelistDataSuccess } from "./cources.action";

@Injectable()

export class CourcesEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchcourcelistdata),
            mergeMap(() =>
                this.CrudService.fetchData('/app/courseList').pipe(
                    map((courcelistdata) => fetchcourcelistSuccess({ courcelistdata })),

                    catchError((error) =>
                        of(fetchcourcelistFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addcourcelistData),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/courseList', newData).pipe(
                    map(() => addcourcelistDataSuccess({ newData })),
                    catchError((error) => of(addcourcelistDataFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updatecourcelistData),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/courseList', updatedData).pipe(
                    map(() => updatecourcelistDataSuccess({ updatedData })),
                    catchError((error) => of(updatecourcelistDataFailure({ error })))
                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deletecourcelistData),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/courseGrid').pipe(
                    map(() => deletecourcelistSuccess({ id })),
                    catchError((error) => of(deletecourcelistFailure({ error })))
                )
            )
        )
    );
    fetchgridData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchcourcegriddata),
            mergeMap(() =>
                this.CrudService.fetchData('/app/courseGrid').pipe(
                    map((Griddata) => fetchcourcegridSuccess({ Griddata })),

                    catchError((error) =>
                        of(fetchcourcegridFailure({ error }))
                    )

                )
            )
        )
    );

    addDgridata$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addcourcegridData),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/courseGrid', newData).pipe(
                    map(() => addcourcegridDataSuccess({ newData })),
                    catchError((error) => of(addcourcegridDataFailure({ error })))
                )
            )
        )
    );

    updategridData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updatecourcegridData),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/courseGrid', updatedData).pipe(
                    map(() => updatecourcegridDataSuccess({ updatedData })),
                    catchError((error) => of(updatecourcegridDataFailure({ error })))
                )
            )
        )
    );

    deletegridData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deletecourcegridData),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/courseGrid').pipe(
                    map(() => deletecourcegridSuccess({ id })),
                    catchError((error) => of(deletecourcegridFailure({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}