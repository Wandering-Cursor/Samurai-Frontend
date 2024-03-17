import { createAction, props } from '@ngrx/store';
import { AgentlistModel } from './agent.model';


// fetch agent data
export const fetchagentData = createAction('[Data] Fetch agent Table Data');
export const fetchagentSuccess = createAction('[Data] Fetch agent Data Success', props<{ agentdata: AgentlistModel[] }>());
export const fetchagentFailure = createAction('[Data] Fetch agent Data Failure', props<{ error: string }>());

// Add Data
export const addagentData = createAction(
    '[Data] Add agentData',
    props<{ newData: AgentlistModel }>()
);
export const addagentDataSuccess = createAction(
    '[Data] Add agentData Success',
    props<{ newData: AgentlistModel }>()
);
export const addagentDataFailure = createAction(
    '[Data] Add agentData Failure',
    props<{ error: string }>()
);


// Update Data
export const updateagentData = createAction(
    '[Data] Update agentData',
    props<{ updatedData: AgentlistModel }>()
);
export const updateagentDataSuccess = createAction(
    '[Data] Update agentData Success',
    props<{ updatedData: AgentlistModel }>()
);
export const updateagentDataFailure = createAction(
    '[Data] Update agentData Failure',
    props<{ error: string }>()
);

// Delete Data
export const deleteagentData = createAction(
    '[Data] Delete agentData',
    props<{ id: string }>()
);
export const deleteagentSuccess = createAction(
    '[Data] Delete agentData Success',
    props<{ id: string }>()
);
export const deleteagentFailure = createAction(
    '[Data] Delete agentData Failure',
    props<{ error: string }>()
);