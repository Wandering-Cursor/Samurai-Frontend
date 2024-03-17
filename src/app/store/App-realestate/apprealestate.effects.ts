
import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { addlistingGridData, addlistingGridDataFailure, addlistingGridDataSuccess, deletelistingGridData, deletelistingGridFailure, deletelistingGridSuccess, fetchRealestateGridData, fetchRealestateGridFailure, fetchRealestateGridSuccess, fetchearningdataData, fetchearningdataFailure, fetchearningdataSuccess, fetchlistingGridData, fetchlistingGridFailure, fetchlistingGridSuccess, fetchlistinglistData, fetchlistinglistDataFailure, fetchlistinglistDataSuccess, updatelistingGridData, updatelistingGridDataFailure, updatelistingGridDataSuccess } from "./apprealestate.action";


@Injectable()
export class AppRealestateEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchlistingGridData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/listingGrid').pipe(
                    map((listingGridData) => fetchlistingGridSuccess({ listingGridData })),

                    catchError((error) =>
                        of(fetchlistingGridFailure({ error }))
                    )

                )
            )
        )
    );

    fetchrealgridData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchRealestateGridData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/listinglistcard').pipe(
                    map((RealestateGridData) => fetchRealestateGridSuccess({ RealestateGridData })),

                    catchError((error) =>
                        of(fetchRealestateGridFailure({ error }))
                    )

                )
            )
        )
    );

    fetchearningData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchearningdataData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/earningdata').pipe(
                    map((earningdata) => fetchearningdataSuccess({ earningdata })),

                    catchError((error) =>
                        of(fetchearningdataFailure({ error }))
                    )

                )
            )
        )
    );

    fetchListingData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchlistinglistData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/listingList').pipe(
                    map((listinglistData) => fetchlistinglistDataSuccess({ listinglistData })),

                    catchError((error) =>
                        of(fetchlistinglistDataFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addlistingGridData),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/listingGrid', newData).pipe(
                    map(() => addlistingGridDataSuccess({ newData })),
                    catchError((error) => of(addlistingGridDataFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updatelistingGridData),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/listingGrid', updatedData).pipe(
                    map(() => updatelistingGridDataSuccess({ updatedData })),
                    catchError((error) => of(updatelistingGridDataFailure({ error })))
                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deletelistingGridData),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/listingGrid').pipe(
                    map(() => deletelistingGridSuccess({ id })),
                    catchError((error) => of(deletelistingGridFailure({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}