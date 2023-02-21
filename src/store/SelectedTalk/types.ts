import { Action } from 'redux';
import { Talk } from './../Talk/types';

export interface SelectedTalkDispatchAction extends Action<SelectedTalkActionTypes> {
    payload?: Talk;
}

export enum SelectedTalkActionTypes {
    SetSelectTalk = 'SET_SELECTED_TALK',
}

export interface SelectedTalkState {
    readonly data?: Talk;
}