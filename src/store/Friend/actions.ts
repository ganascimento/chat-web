import { Friend, FriendDispatchAction, FriendActionTypes } from './types';
import { Dispatch } from 'redux';

export class FriendDispatcher {
    private readonly dispatch: Dispatch<FriendDispatchAction>;

    constructor(dispatch: Dispatch<FriendDispatchAction>) {
        this.dispatch = dispatch;        
    }

    loadRequest = () => this.dispatch({ type: FriendActionTypes.LoadRequest, payload: undefined });
    
    setFriends = (friends: Friend[]) => this.dispatch({ type: FriendActionTypes.LoadSuccess, payload: friends });
}