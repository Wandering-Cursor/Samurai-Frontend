import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { addCategoryData, addCategoryFailure, addCategorySuccess, fetchcategoryData, fetchcategoryFailure, fetchcategorySuccess, fetchinstructorData, fetchinstructorFailure, fetchinstructorSuccess, fetchrecentcourseData, fetchrecentcourseSuccess } from "./learning.action";


@Injectable()
export class LearningEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchinstructorData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/instructor').pipe(
                    map((instructorData) => fetchinstructorSuccess({ instructorData })),

                    catchError((error) =>
                        of(fetchinstructorFailure({ error }))
                    )

                )
            )
        )
    );
    fetchcategoryData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchcategoryData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/category').pipe(
                    map((categoryData) => fetchcategorySuccess({ categoryData })),

                    catchError((error) =>
                        of(fetchcategoryFailure({ error }))
                    )

                )
            )
        )
    );

    fetchrecentData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchrecentcourseData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/recentcourse').pipe(
                    map((recentcourseData) => fetchrecentcourseSuccess({ recentcourseData })),

                    catchError((error) =>
                        of(fetchinstructorFailure({ error }))
                    )

                )
            )
        )
    );

    addData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addCategoryData),
            mergeMap(({ newData }) =>
                this.CrudService.addData('/app/category', newData).pipe(
                    map(() => addCategorySuccess({ newData })),
                    catchError((error) => of(addCategoryFailure({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private CrudService: CrudService
    ) { }
}