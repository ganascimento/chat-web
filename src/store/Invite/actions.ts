import { InviteDispatchAction, InviteActionTypes, Person, Invitation } from './types';
import { Dispatch } from 'redux';

export class InviteDispatcher {
    private readonly dispatch: Dispatch<InviteDispatchAction>;

    constructor(dispatch: Dispatch<InviteDispatchAction>) {
        this.dispatch = dispatch;        
    }

    loadRequest = (search: string) => this.dispatch({ type: InviteActionTypes.LoadRequest, search: search });

    setPersons = (persons: Person[]) => this.dispatch({ type: InviteActionTypes.SetPersons, payload: persons });

    setInvites = (invites: Invitation[]) => this.dispatch({ type:InviteActionTypes.SetInvitation, invitation: invites });
}