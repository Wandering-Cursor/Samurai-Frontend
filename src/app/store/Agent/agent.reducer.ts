import { Action, createReducer, on } from '@ngrx/store';
import { addagentDataSuccess, deleteagentSuccess, fetchagentData, fetchagentFailure, fetchagentSuccess, updateagentDataSuccess } from './agent.action';


export interface AgentState {
    agentdata: any[];
    loading: boolean;
    error: any;
}

export const initialState: AgentState = {
    agentdata: [],
    loading: false,
    error: null
};

export const AgentReducer = createReducer(

    initialState,
    on(fetchagentData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchagentSuccess, (state, { agentdata }) => {
        return { ...state, agentdata, loading: false };
    }),
    on(fetchagentFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(addagentDataSuccess, (state, { newData }) => {
        return { ...state, agentdata: [newData, ...state.agentdata], error: null };

    }),
    on(updateagentDataSuccess, (state, { updatedData }) => {
        return { ...state, agentdata: state.agentdata.map((agentdata) => agentdata.id === updatedData.id ? updatedData : agentdata), error: null };
    }),

    on(deleteagentSuccess, (state, { id }) => {
        const updatedlist = state.agentdata.filter((agentdata) => !id.includes(agentdata.id));
        return { ...state, agentdata: updatedlist, error: null };
    }),

)

// Selector
export function reducer(state: AgentState | undefined, action: Action) {
    return AgentReducer(state, action);
}