import { Talk, TalkDispatchAction, TalkActionTypes } from './types';
import { Dispatch } from 'redux';

export class TalkDispatcher {
    private readonly dispatch: Dispatch<TalkDispatchAction>;

    constructor(dispatch: Dispatch<TalkDispatchAction>) {
        this.dispatch = dispatch;        
    }

    setTalk = (talks: Talk[]) => this.dispatch({ type: TalkActionTypes.SetTalk, payload: talks });
}