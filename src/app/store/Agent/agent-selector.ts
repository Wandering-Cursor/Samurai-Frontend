import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AgentState } from './agent.reducer';

export const selectDataState = createFeatureSelector<AgentState>('Agentlist');

export const selectagentData = createSelector(
    selectDataState,
    (state: AgentState) => state.agentdata
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: AgentState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: AgentState) => state.error
);


