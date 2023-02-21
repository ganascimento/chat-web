import { User, UserDispatchAction, UserActionTypes } from './types';
import { Dispatch } from 'redux';

export class UserDispatcher {
    private readonly dispatch: Dispatch<UserDispatchAction>;

    constructor(dispatch: Dispatch<UserDispatchAction>) {
        this.dispatch = dispatch;        
    }

    loadRequest = () => this.dispatch({ type: UserActionTypes.LoadRequest, payload: undefined });

    loginRequest = (user: User) => this.dispatch({ type: UserActionTypes.LoginRequest, payload: user });

    registerRequest = (user: User) => this.dispatch({ type: UserActionTypes.RegisterRequest, payload: user });

    resetState = () => this.dispatch({ type: UserActionTypes.ResetState });
}