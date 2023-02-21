import { SelectedTalkActionTypes, SelectedTalkState } from './types';
import { Reducer } from 'redux'

export const initialState: SelectedTalkState = {
    data: undefined
};

const reducer: Reducer<SelectedTalkState> = (state = initialState, action) => {
    switch (action.type) {
        case SelectedTalkActionTypes.SetSelectTalk:
            return { ...state, data: action.payload }
        default:
            return state;
    }
}

export default reducer;