import { Action, createReducer, on } from '@ngrx/store';
import { fetchattachmentData, fetchattachmentDataFailure, fetchattachmentDataSuccess, fetchbookmarkData, fetchbookmarkDataFailure, fetchbookmarkDataSuccess, fetchcallsData, fetchcallsDataFailure, fetchcallsDataSuccess, fetchchannnelData, fetchchannnelDataFailure, fetchchannnelDataSuccess, fetchchatData, fetchchatDataFailure, fetchchatDataSuccess, fetchcontactData, fetchcontactDataFailure, fetchcontactDataSuccess, fetchmessagesData, fetchmessagesFailure, fetchmessagesSuccess } from './chat.action';


export interface ChatState {
    messageData: any[];
    chatlist: any[];
    channnellist: any[];
    contactlist: any[];
    attachmentlist: any[];
    calllist: any[];
    bookmarklist: any[];
    loading: boolean;
    error: any;
}

export const initialState: ChatState = {
    messageData: [],
    chatlist: [],
    channnellist: [],
    contactlist: [],
    attachmentlist: [],
    calllist: [],
    bookmarklist: [],
    loading: false,
    error: null
};

export const ChatReducer = createReducer(
    initialState,
    on(fetchmessagesData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchmessagesSuccess, (state, { messageData }) => {
        return { ...state, messageData, loading: false };
    }),
    on(fetchmessagesFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(fetchchatData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchchatDataSuccess, (state, { chatlist }) => {
        return { ...state, chatlist, loading: false };
    }),
    on(fetchchatDataFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(fetchchannnelData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchchannnelDataSuccess, (state, { channnellist }) => {
        return { ...state, channnellist, loading: false };
    }),
    on(fetchchannnelDataFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(fetchcontactData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchcontactDataSuccess, (state, { contactlist }) => {
        return { ...state, contactlist, loading: false };
    }),
    on(fetchcontactDataFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(fetchattachmentData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchattachmentDataSuccess, (state, { attachmentlist }) => {
        return { ...state, attachmentlist, loading: false };
    }),
    on(fetchattachmentDataFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(fetchcallsData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchcallsDataSuccess, (state, { calllist }) => {
        return { ...state, calllist, loading: false };
    }),
    on(fetchcallsDataFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),

    on(fetchbookmarkData, (state) => {
        return { ...state, loading: true, error: null };
    }),
    on(fetchbookmarkDataSuccess, (state, { bookmarklist }) => {
        return { ...state, bookmarklist, loading: false };
    }),
    on(fetchbookmarkDataFailure, (state, { error }) => {
        return { ...state, error, loading: false };
    }),
)

// Selector
export function reducer(state: ChatState | undefined, action: Action) {
    return ChatReducer(state, action);
}