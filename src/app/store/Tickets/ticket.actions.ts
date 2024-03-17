import { createAction, props } from '@ngrx/store';
import { SupportModel, TicketModel } from './ticket.model';

export const fetchsupporticketsData = createAction('[Data] Fetch supporttickets Table Data');
export const fetchsupporticketsSuccess = createAction('[Data] Fetch supporttickets Data Success', props<{ supporTickets: SupportModel[] }>());
export const fetchsupporticketsFailure = createAction('[Data] Fetch supporttickets Data Failure', props<{ error: string }>());


export const fetchticketlistData = createAction('[Data] Fetch ticketlist Table Data');
export const fetchticketlistSuccess = createAction('[Data] Fetch ticketlist Data Success', props<{ ticketdata: TicketModel[] }>());
export const fetchticketlistFailure = createAction('[Data] Fetch ticketlist Data Failure', props<{ error: string }>());


// Add Data
export const addticketlistData = createAction(
    '[Data] Add ticketlistData',
    props<{ newData: TicketModel }>()
);
export const addticketlistDataSuccess = createAction(
    '[Data] Add ticketlistData Success',
    props<{ newData: TicketModel }>()
);
export const addticketlistDataFailure = createAction(
    '[Data] Add ticketlistData Failure',
    props<{ error: string }>()
);


// Update Data
export const updateticketlistData = createAction(
    '[Data] Update ticketlistData',
    props<{ updatedData: TicketModel }>()
);
export const updateticketlistDataSuccess = createAction(
    '[Data] Update ticketlistData Success',
    props<{ updatedData: TicketModel }>()
);
export const updateticketlistDataFailure = createAction(
    '[Data] Update ticketlistData Failure',
    props<{ error: string }>()
);

// Delete Data
export const deleteticketlistData = createAction(
    '[Data] Delete ticketlistData',
    props<{ id: string }>()
);
export const deleteticketlistSuccess = createAction(
    '[Data] Delete ticketlistData Success',
    props<{ id: string }>()
);
export const deleteticketlistFailure = createAction(
    '[Data] Delete ticketlistData Failure',
    props<{ error: string }>()
); 