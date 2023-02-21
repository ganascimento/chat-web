import { FriendActionTypes, FriendState } from './types';
import { Reducer } from 'redux'

export const initialState: FriendState = {
    loading: false,
    fail: false,
    data: undefined
};

const reducer: Reducer<FriendState> = (state = initialState, action) => {
    switch (action.type) {
        case FriendActionTypes.LoadSuccess:
            return { ...state, data: action.payload, loading: false, fail: false }
        case FriendActionTypes.LoadFailure:
            return { ...state, data: undefined, loading: false, fail: true }
        case FriendActionTypes.LoadRequest:
            return { ...state, data: action.payload, loading: true, fail: false }
        default:
            return state;
    }
}

export default reducer;