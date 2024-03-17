import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { deleteinvoice, deleteinvoiceFailure, deleteinvoiceSuccess, fetchInvoiceData, fetchInvoiceFailure, fetchInvoiceSuccess, fetchInvoicelistData, fetchInvoicelistFailure, fetchInvoicelistSuccess } from "./invoices.action";


@Injectable()

export class InvoiceEffects {
    fetchlistData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchInvoicelistData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/invoiceList').pipe(
                    map((Invoicelistdata) => fetchInvoicelistSuccess({ Invoicelistdata })),
                    catchError((error) =>
                        of(fetchInvoicelistFailure({ error }))
                    )

                )
            )
        )
    );

    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchInvoiceData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/invoice').pipe(
                    map((Invoicedata) => fetchInvoiceSuccess({ Invoicedata })),
                    catchError((error) =>
                        of(fetchInvoiceFailure({ error }))
                    )

                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteinvoice),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/invoiceList').pipe(
                    map(() => deleteinvoiceSuccess({ id })),
                    catchError((error) => of(deleteinvoiceFailure({ error })))
                )
            )
        )
    );
    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}