import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatState } from './chat.reducer';

export const selectDataState = createFeatureSelector<ChatState>('Chatmessage');

export const selectData = createSelector(
    selectDataState,
    (state: ChatState) => state.messageData
);
export const selectcallslistData = createSelector(
    selectDataState,
    (state: ChatState) => state.chatlist
);
export const selectchannelData = createSelector(
    selectDataState,
    (state: ChatState) => state.channnellist
);
export const selectcontactData = createSelector(
    selectDataState,
    (state: ChatState) => state.contactlist
);
export const selectattachmentData = createSelector(
    selectDataState,
    (state: ChatState) => state.attachmentlist
);
export const selectcallData = createSelector(
    selectDataState,
    (state: ChatState) => state.calllist
);
export const selectbookmarkData = createSelector(
    selectDataState,
    (state: ChatState) => state.bookmarklist
);

export const selectDataLoading = createSelector(
    selectDataState,
    (state: ChatState) => state.loading
);

export const selectDataError = createSelector(
    selectDataState,
    (state: ChatState) => state.error
);


