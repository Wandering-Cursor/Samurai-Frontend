import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TicketState } from './ticket.reducer';

export const selectDataState = createFeatureSelector<TicketState>('ticketlist');

export const selectData = createSelector(
    selectDataState,
    (state: TicketState) => state.supporTickets
);
export const selectlistData = createSelector(
    selectDataState,
    (state: TicketState) => state.ticketdata
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: TicketState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: TicketState) => state.error
);


