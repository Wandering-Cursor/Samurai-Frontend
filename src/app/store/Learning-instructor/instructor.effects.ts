import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { addinstructorgridData, addinstructorgridDataFailure, addinstructorgridDataSuccess, addinstructorlistData, addinstructorlistDataFailure, addinstructorlistDataSuccess, deleteinstructorgridData, deleteinstructorgridFailure, deleteinstructorgridSuccess, deleteinstructorlistData, deleteinstructorlistFailure, deleteinstructorlistSuccess, fetchinstructorListData, fetchinstructorListFailure, fetchinstructorListSuccess, fetchinstructorgridData, fetchinstructorgridSuccess, updateinstructorgridData, updateinstructorgridDataFailure, updateinstructorgridDataSuccess, updateinstructorlistData, updateinstructorlistDataFailure, updateinstructorlistDataSuccess } from "./instructor.action";

@Injectable()
export class InstructorEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchinstructorListData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/instructorlist').pipe(
                    map((instructorlist) => fetchinstructorListSuccess({ instructorlist })),

                    catchError((error) =>
                        of(fetchinstructorListFailure({ error }))
                    )

                )
            )
        )
    );

    fetchgridData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchinstructorgridData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/instructorGrid').pipe(
                    map((instructorGrid) => fetchinstructorgridSuccess({ instructorGrid })),

                    catchError((error) =>
                        of(fetchinstructorListFailure({ error }))
                    )

                )
            )
        )
    );

    // List Data
    addListData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addinstructorlistData),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/instructorlist', newData).pipe(
                    map(() => addinstructorlistDataSuccess({ newData })),
                    catchError((error) => of(addinstructorlistDataFailure({ error })))
                )
            )
        )
    );

    updateListData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateinstructorlistData),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/instructorlist', updatedData).pipe(
                    map(() => updateinstructorlistDataSuccess({ updatedData })),
                    catchError((error) => of(updateinstructorlistDataFailure({ error })))
                )
            )
        )
    );

    deleteListData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteinstructorlistData),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/instructorlist').pipe(
                    map(() => deleteinstructorlistSuccess({ id })),
                    catchError((error) => of(deleteinstructorlistFailure({ error })))
                )
            )
        )
    );


    // Grid Data
    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addinstructorgridData),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/instructorGrid', newData).pipe(
                    map(() => addinstructorgridDataSuccess({ newData })),
                    catchError((error) => of(addinstructorgridDataFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateinstructorgridData),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/instructorGrid', updatedData).pipe(
                    map(() => updateinstructorgridDataSuccess({ updatedData })),
                    catchError((error) => of(updateinstructorgridDataFailure({ error })))
                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteinstructorgridData),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/instructorGrid').pipe(
                    map(() => deleteinstructorgridSuccess({ id })),
                    catchError((error) => of(deleteinstructorgridFailure({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}
