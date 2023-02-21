import { TalkActionTypes, TalkState } from './types';
import { Reducer } from 'redux'

export const initialState: TalkState = {
    loading: false,
    fail: false,
    completed: false,
    data: undefined
};

const reducer: Reducer<TalkState> = (state = initialState, action) => {
    switch (action.type) {
        case TalkActionTypes.LoadSuccess:
            return { ...state, data: action.payload, loading: false, fail: false, completed: true }
        case TalkActionTypes.LoadFailure:
            return { ...state, data: action.payload, loading: false, fail: true, completed: false }
        case TalkActionTypes.LoadRequest:
            return { ...state, data: action.payload, loading: true, fail: false, completed: false }
        case TalkActionTypes.SetTalk:
            return { ...state, data: action.payload }
        default:
            return state;
    }
}

export default reducer;