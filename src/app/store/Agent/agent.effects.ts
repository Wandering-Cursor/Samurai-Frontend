import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { addagentData, addagentDataFailure, addagentDataSuccess, deleteagentData, deleteagentFailure, deleteagentSuccess, fetchagentData, fetchagentFailure, fetchagentSuccess, updateagentData, updateagentDataFailure, updateagentDataSuccess } from "./agent.action";
import { fetchsalesFailure } from "../Ecommerce/ecommerce.actions";

@Injectable()

export class AgentEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchagentData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/agent').pipe(
                    map((agentdata) => fetchagentSuccess({ agentdata })),

                    catchError((error) =>
                        of(fetchagentFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addagentData),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/agent', newData).pipe(
                    map(() => addagentDataSuccess({ newData })),
                    catchError((error) => of(addagentDataFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateagentData),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/agent', updatedData).pipe(
                    map(() => updateagentDataSuccess({ updatedData })),
                    catchError((error) => of(updateagentDataFailure({ error })))
                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteagentData),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/agent').pipe(
                    map(() => deleteagentSuccess({ id })),
                    catchError((error) => of(deleteagentFailure({ error })))
                )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}