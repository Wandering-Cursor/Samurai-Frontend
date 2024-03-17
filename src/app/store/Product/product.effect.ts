import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { addproductsList, addproductsListFailure, addproductsListSuccess, deleteproductsList, deleteproductsListFailure, deleteproductsListSuccess, fetchproductsList, fetchproductsListFailure, fetchproductsListSuccess, updateproductLists, updateproductsListFailure, updateproductsListSuccess } from "./product.action";

@Injectable()

export class ProductEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchproductsList),
            mergeMap(() =>
                this.CrudService.fetchData('/app/productList').pipe(
                    map((productlist) => fetchproductsListSuccess({ productlist })),

                    catchError((error) =>
                        of(fetchproductsListFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addproductsList),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/productList', newData).pipe(
                    map(() => addproductsListSuccess({ newData })),
                    catchError((error) => of(addproductsListFailure({ error })))
                )
            )
        )
    );

    updateData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateproductLists),
            mergeMap(({ updatedData }) =>
                this.CrudService.updateData('/app/productList', updatedData).pipe(
                    map(() => updateproductsListSuccess({ updatedData })),
                    catchError((error) => of(updateproductsListFailure({ error })))
                )
            )
        )
    );

    deleteData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteproductsList),
            mergeMap(({ id }) =>
                this.CrudService.deleteData('/app/productList').pipe(
                    map(() => deleteproductsListSuccess({ id })),
                    catchError((error) => of(deleteproductsListFailure({ error })))
                )
            )
        )
    );


    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}