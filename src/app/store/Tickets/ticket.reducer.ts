import { Action, createReducer, on } from '@ngrx/store';
import { addticketlistDataSuccess, deleteticketlistSuccess, fetchsupporticketsData, fetchsupporticketsFailure, fetchsupporticketsSuccess, fetchticketlistData, fetchticketlistFailure, fetchticketlistSuccess, updateticketlistDataSuccess } from './ticket.actions';


export interface TicketState {
    supporTickets: any[];
    ticketdata: any[];
    loading: boolean;
    error: any;
}

export const initialState: TicketState = {
    supporTickets: [],
    ticketdata: [],
    loading: false,
    error: null
};

export const TicketReducer = createReducer(

    initialState,
    on(fetchsupporticketsData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchsupporticketsSuccess, (state, { supporTickets }) => {
        return { ...state, supporTickets, loading: false };
    }),
    on(fetchsupporticketsFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),


    on(fetchticketlistData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchticketlistSuccess, (state, { ticketdata }) => {
        return { ...state, ticketdata, loading: false };
    }),
    on(fetchticketlistFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(addticketlistDataSuccess, (state, { newData }) => {
        return { ...state, ticketdata: [newData, ...state.ticketdata], error: null };

    }),
    on(updateticketlistDataSuccess, (state, { updatedData }) => {
        return { ...state, ticketdata: state.ticketdata.map((ticketdata) => ticketdata.id === updatedData.id ? updatedData : ticketdata), error: null };
    }),

    on(deleteticketlistSuccess, (state, { id }) => {
        const updatedlist = state.ticketdata.filter((ticketdata) => !id.includes(ticketdata.id));
        return { ...state, ticketdata: updatedlist, error: null };
    }),

)

// Selector
export function reducer(state: TicketState | undefined, action: Action) {
    return TicketReducer(state, action);
}