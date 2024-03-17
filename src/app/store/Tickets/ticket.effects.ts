import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { addticketlistData, addticketlistDataFailure, addticketlistDataSuccess, deleteticketlistData, deleteticketlistFailure, deleteticketlistSuccess, fetchsupporticketsData, fetchsupporticketsFailure, fetchsupporticketsSuccess, fetchticketlistData, fetchticketlistFailure, fetchticketlistSuccess, updateticketlistData, updateticketlistDataFailure, updateticketlistDataSuccess } from "./ticket.actions";

@Injectable()
export class TicketEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchsupporticketsData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/supporttickets').pipe(
                    map((supporTickets) => fetchsupporticketsSuccess({ supporTickets })),

                    catchError((error) =>
                        of(fetchsupporticketsFailure({ error }))
                    )

                )
            )
        )
    );
    fetchlistData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchticketlistData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/ticketList').pipe(
                    map((ticketdata) => fetchticketlistSuccess({ ticketdata })),

                    catchError((error) =>
                        of(fetchticketlistFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addticketlistData),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/ticketList', newData).pipe(
                    map(() => addticketlistDataSuccess({ newData })),
                    catchError((error) => of(addticketlistDataFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateticketlistData),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/ticketList', updatedData).pipe(
                    map(() => updateticketlistDataSuccess({ updatedData })),
                    catchError((error) => of(updateticketlistDataFailure({ error })))
                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteticketlistData),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/ticketList').pipe(
                    map(() => deleteticketlistSuccess({ id })),
                    catchError((error) => of(deleteticketlistFailure({ error })))
                )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}