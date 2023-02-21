import { Reducer } from 'redux';
import { UserState, UserActionTypes } from './types';

const initialState: UserState = {
    authenticated: false,
    fail: false,
    loading: false,
    data: undefined,
    registerError: false
}

const reducer: Reducer<UserState> = (state = initialState, action) => {
    switch (action.type) {
        case UserActionTypes.LoadFailure:
            return { ...state, data: undefined, loading: false, authenticated: false, fail: true, registerError: false };
        case UserActionTypes.LoadSuccess:
            return { ...state, data: action.payload, loading: false, authenticated: true, fail: false, registerError: false };
        case UserActionTypes.LoadRequest:
            return { ...state, data: undefined, loading: true, authenticated: false, fail: false, registerError: false };
        case UserActionTypes.LoginRequest:
            return { ...state, data: action.payload, loading: true, authenticated: false, fail: false, registerError: false };
        case UserActionTypes.RegisterRequest:
            return { ...state, data: action.payload, loading: true, authenticated: false, fail: false, registerError: false };
        case UserActionTypes.RegisterFailure:
            return { ...state, data: undefined, loading: false, authenticated: false, fail: false, registerError: true };
        case UserActionTypes.ResetState:
            return { ...state, data: undefined, loading: false, authenticated: false, fail: false, registerError: false };
        default:
            return state;
    }
}

export default reducer;