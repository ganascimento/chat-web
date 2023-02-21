import { InviteActionTypes, InviteState } from './types';
import { Reducer } from 'redux'

export const initialState: InviteState = {
    loading: false,
    fail: false,
    data: undefined,
    invites: undefined
};

const reducer: Reducer<InviteState> = (state = initialState, action) => {
    switch (action.type) {
        case InviteActionTypes.LoadSuccess:
            return { ...state, data: action.payload, loading: false, fail: false }
        case InviteActionTypes.LoadFailure:
            return { ...state, data: undefined, loading: false, fail: true }
        case InviteActionTypes.LoadRequest:
            return { ...state, data: undefined, loading: true, fail: false }
        case InviteActionTypes.SetPersons:
            return { ...state, data: action.payload, loading: false, fail: false }
        case InviteActionTypes.LoadSuccessInvites:
            return { ...state, invites: action.payload, loading: false, fail: false }
        case InviteActionTypes.SetInvitation:
            return { ...state, invites: action.invitation, loading: false, fail: false }
        default:
            return state;
    }
}

export default reducer;