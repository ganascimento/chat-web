import { Action } from 'redux';

export interface Person {
    id: number;
    name: string;
    avatar?: string;
    ehSent?: boolean;
}

export interface Invitation {
    id: number;
    userSentId: number;
    person: Person;
}

export interface InviteDispatchAction extends Action<InviteActionTypes> {
    payload?: Person[];
    search?: string;
    invitation?: Invitation[];
}

export enum InviteActionTypes {
    LoadSuccess = 'LOAD_SUCCESS_INVITE',
    LoadSuccessInvites = 'LOAD_SUCCESS_INVITES',
    LoadFailure = 'LOAD_FAILURE_INVITE',
    LoadRequest = 'LOAD_REQUEST_INVITE',
    SetPersons = 'SET_PERSON_INVITES',
    SetInvitation = 'SET_INVITES'
}

export interface InviteState {
    readonly loading: boolean;
    readonly fail: boolean;
    readonly data?: Person[];
    readonly invites?: Invitation[];
}