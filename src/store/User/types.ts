import { Action } from 'redux';

export interface User {
    id?: number;
    name?: string;
    avatar?: string;
    email: string;
    password?: string;
}

export interface UserDispatchAction extends Action<UserActionTypes> {
    payload?: User;
}

export enum UserActionTypes {
    LoadSuccess = 'LOAD_SUCCESS_USER',
    LoadFailure = 'LOAD_FAILURE_USER',
    LoadRequest = 'LOAD_REQUEST_USER',
    LoginRequest = 'LOGIN_REQUEST_USER',
    RegisterRequest = 'REGISTER_REQUEST_USER',
    RegisterFailure = 'REGISTER_FAILURE_USER',
    ResetState = 'RESET_STATE_USER'
}

export interface UserState {
    readonly data?: User;
    readonly loading: boolean;
    readonly fail: boolean;
    readonly authenticated: boolean;
    readonly registerError?: boolean;
}