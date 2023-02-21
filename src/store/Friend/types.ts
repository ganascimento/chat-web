import { Action } from 'redux';

export interface Friend {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    isOnline: boolean;
}

export interface FriendDispatchAction extends Action<FriendActionTypes> {
    payload?: Friend[];
}

export enum FriendActionTypes {
    LoadSuccess = 'LOAD_SUCCESS_FRIEND',
    LoadFailure = 'LOAD_FAILURE_FRIEND',
    LoadRequest = 'LOAD_REQUEST_FRIEND'
}

export interface FriendState {
    readonly loading: boolean;
    readonly fail: boolean;
    readonly data?: Friend[];
}