import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { fetchCourcesFailure, fetchCourcesSuccess, fetchCourcesdata, fetchSubscriptionFailure, fetchSubscriptionSuccess, fetchSubscriptiondata } from "./student.action";

@Injectable()

export class studentsEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchSubscriptiondata),
            mergeMap(() =>
                this.CrudService.fetchData('/app/subscription').pipe(
                    map((Subscriptiondata) => fetchSubscriptionSuccess({ Subscriptiondata })),

                    catchError((error) =>
                        of(fetchSubscriptionFailure({ error }))
                    )

                )
            )
        )
    )
    fetchCourcesData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchCourcesdata),
            mergeMap(() =>
                this.CrudService.fetchData('/app/cources').pipe(
                    map((Courcesdata) => fetchCourcesSuccess({ Courcesdata })),

                    catchError((error) =>
                        of(fetchCourcesFailure({ error }))
                    )

                )
            )
        )
    )
    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}