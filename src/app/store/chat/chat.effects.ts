import { Injectable } from "@angular/core";
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CrudService } from "src/app/core/services/crud.service";
import { fetchattachmentData, fetchattachmentDataFailure, fetchattachmentDataSuccess, fetchbookmarkData, fetchbookmarkDataFailure, fetchbookmarkDataSuccess, fetchcallsData, fetchcallsDataFailure, fetchcallsDataSuccess, fetchchannnelData, fetchchannnelDataFailure, fetchchannnelDataSuccess, fetchchatData, fetchchatDataFailure, fetchchatDataSuccess, fetchcontactData, fetchcontactDataFailure, fetchcontactDataSuccess, fetchmessagesData, fetchmessagesFailure, fetchmessagesSuccess } from "./chat.action";


@Injectable()

export class ChatEffects {
    fetchData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchmessagesData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/message').pipe(
                    map((messageData) => fetchmessagesSuccess({ messageData })),

                    catchError((error) =>
                        of(fetchmessagesFailure({ error }))
                    )

                )
            )
        )
    );
    fetchatData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchchatData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/chatData').pipe(
                    map((chatlist) => fetchchatDataSuccess({ chatlist })),

                    catchError((error) =>
                        of(fetchchatDataFailure({ error }))
                    )

                )
            )
        )
    );

    fetchannellistData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchchannnelData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/channnellist').pipe(
                    map((channnellist) => fetchchannnelDataSuccess({ channnellist })),

                    catchError((error) =>
                        of(fetchchannnelDataFailure({ error }))
                    )

                )
            )
        )
    );

    fetcontactData$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchcontactData),
            mergeMap(() =>
                this.CrudService.fetchData('/app/chatContactData').pipe(
                    map((contactlist) => fetchcontactDataSuccess({ contactlist })),

                    catchError((error) =>
                        of(fetchcontactDataFailure({ error }))
                    )

                )
            )
        )
    );

    fetchattachmentData$ = createEffect(() =>
    this.actions$.pipe(
        ofType(fetchattachmentData),
        mergeMap(() =>
            this.CrudService.fetchData('/app/attachementsData').pipe(
                map((attachmentlist) => fetchattachmentDataSuccess({ attachmentlist })),

                catchError((error) =>
                    of(fetchattachmentDataFailure({ error }))
                )

            )
        )
    )
    );
    
    fetchcallsData$ = createEffect(() =>
    this.actions$.pipe(
        ofType(fetchcallsData),
        mergeMap(() =>
            this.CrudService.fetchData('/app/callsData').pipe(
                map((calllist) => fetchcallsDataSuccess({ calllist })),

                catchError((error) =>
                    of(fetchcallsDataFailure({ error }))
                )

            )
        )
    )
    );
    
    fetchbookmarkData$ = createEffect(() =>
    this.actions$.pipe(
        ofType(fetchbookmarkData),
        mergeMap(() =>
            this.CrudService.fetchData('/app/bookmarkData').pipe(
                map((bookmarklist) => fetchbookmarkDataSuccess({ bookmarklist })),

                catchError((error) =>
                    of(fetchbookmarkDataFailure({ error }))
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