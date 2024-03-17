import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { fetchStatData, fetchStatFailure, fetchStatSuccess, fetchtopPageData, fetchtopPageFailure, fetchtopPageSuccess } from "./analytics.actions";

@Injectable()
export class AnalyticsEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchStatData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/browser').pipe(
                    map((browserData) => fetchStatSuccess({ browserData })),

                    catchError((error) =>
                        of(fetchStatFailure({ error }))
                    )

                )
            )
        )
    );

    fetchtopData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchtopPageData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/toppage').pipe(
                    map((PageData) => fetchtopPageSuccess({ PageData })),

                    catchError((error) =>
                        of(fetchtopPageFailure({ error }))
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