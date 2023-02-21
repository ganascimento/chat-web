import { SelectedTalkDispatchAction, SelectedTalkActionTypes } from './types';
import { Talk } from './../Talk/types';
import { Dispatch } from 'redux';

export class SelectedTalkDispatcher {
    private readonly dispatch: Dispatch<SelectedTalkDispatchAction>;

    constructor(dispatch: Dispatch<SelectedTalkDispatchAction>) {
        this.dispatch = dispatch;        
    }
    
    setTalk = (selectedTalk: Talk) => this.dispatch({ type: SelectedTalkActionTypes.SetSelectTalk, payload: selectedTalk });
}