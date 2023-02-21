import { combineReducers } from 'redux';
import user from './User/reducer';
import friend from './Friend/reducer';
import talk from './Talk/reducer';
import invite from './Invite/reducer';
import selectedTalk from './SelectedTalk/reducer';
import { UserState } from './User/types';
import { FriendState } from './Friend/types';
import { TalkState } from './Talk/types';
import { InviteState } from './Invite/types';
import { SelectedTalkState } from './SelectedTalk/types';

export interface ApplicationState {
    user: UserState;
    friend: FriendState;
    talk: TalkState;
    invite: InviteState;
    selectedTalk: SelectedTalkState;
}

export default combineReducers({
    user,
    friend,
    talk,
    invite,
    selectedTalk
});