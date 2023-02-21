import { Action } from 'redux';
import { Message } from './../Message/types';

export interface Talk {
    conversationId: string;
    friendId?: number;
    messages: Message[];
}

export interface TalkDispatchAction extends Action<TalkActionTypes> {
    payload?: Talk[];
}

export enum TalkActionTypes {
    LoadSuccess = 'LOAD_SUCCESS_TALK',
    LoadFailure = 'LOAD_FAILURE_TALK',
    LoadRequest = 'LOAD_REQUEST_TALK',
    SetTalk = 'SET_TALK'
}

export interface TalkState {
    readonly loading: boolean;
    readonly fail: boolean;
    readonly completed: boolean;
    readonly data?: Talk[];
}