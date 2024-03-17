import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";

import { fetchdealData, fetchdealFailure, fetchdealSuccess, fetchleadData, fetchleadFailure, fetchleadSuccess, fetchtableData, fetchtableFailure, fetchtableSuccess, fetchtaksData, fetchtasksFailure, fetchtasksSuccess } from "./crm.actions";

@Injectable()
export class CRMEffects {


    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchtableData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/table').pipe(
                    map((crmData) => fetchtableSuccess({ crmData })),

                    catchError((error) =>
                        of(fetchtableFailure({ error }))
                    )

                )
            )
        )
    );

    fetchleadData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchleadData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/lead').pipe(
                    map((leadata) => fetchleadSuccess({ leadata })),

                    catchError((error) =>
                        of(fetchleadFailure({ error }))
                    )

                )
            )
        )
    );
    fetchdealData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchdealData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/deal').pipe(
                    map((dealdata) => fetchdealSuccess({ dealdata })),

                    catchError((error) =>
                        of(fetchdealFailure({ error }))
                    )

                )
            )
        )
    );
    fetchtaskData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchtaksData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/tasks').pipe(
                    map((tasksdata) => fetchtasksSuccess({ tasksdata })),

                    catchError((error) =>
                        of(fetchtasksFailure({ error }))
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