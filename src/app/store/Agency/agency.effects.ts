import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { addAgenciesData, addAgenciesDataFailure, addAgenciesDataSuccess, deleteAgenciesData, deleteAgenciesFailure, deleteAgenciesSuccess, fetchAgenciesData, fetchAgenciesFailure, fetchAgenciesSuccess, updateAgenciesData, updateAgenciesDataFailure, updateAgenciesDataSuccess } from "./agency.action";


@Injectable()

export class AgenciesEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchAgenciesData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/agencies').pipe(
                    map((Agenciesdata) => fetchAgenciesSuccess({ Agenciesdata })),

                    catchError((error) =>
                        of(fetchAgenciesFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addAgenciesData),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/agencies', newData).pipe(
                    map(() => addAgenciesDataSuccess({ newData })),
                    catchError((error) => of(addAgenciesDataFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateAgenciesData),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/agencies', updatedData).pipe(
                    map(() => updateAgenciesDataSuccess({ updatedData })),
                    catchError((error) => of(updateAgenciesDataFailure({ error })))
                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteAgenciesData),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/agencies').pipe(
                    map(() => deleteAgenciesSuccess({ id })),
                    catchError((error) => of(deleteAgenciesFailure({ error })))
                )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}