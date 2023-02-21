import { call, put } from 'redux-saga/effects';
import api from './../../services/api';
import { AnyAction } from 'redux'
import { login as loginApp } from './../../services/auth';
import { User, UserActionTypes } from './types';
import { Talk, TalkActionTypes } from './../Talk/types';
import { Friend, FriendActionTypes } from './../Friend/types';
import { Invitation, Person, InviteActionTypes } from './../Invite/types';

export function * login(action: AnyAction) {
    try {
        const user: User = action.payload;
        
        let response = yield call(api.post, '/account/login', {
            Email: user.email,
            Password: user.password
        });

        loginApp(response.data.accessToken, response.data.expiration);

        yield init();
    } catch {
        yield put({ type: UserActionTypes.LoadFailure });
    }
}

export function * register(action: AnyAction) {
    try {
        const user: User = action.payload;

        let response = yield call(api.post, '/account/register', {
            Email: user.email,
            Password: user.password,
            Name: user.name,
            Avatar: user.avatar
        });

        loginApp(response.data.accessToken, response.data.expiration);

        yield init();
    } catch (error){
        if (error.response.status === 403) yield put ({ type: UserActionTypes.RegisterFailure});
        else yield put({ type: UserActionTypes.LoadFailure });
    }
}

export function * load() {    
    try {
        yield init();
    } catch {
        yield put({ type: UserActionTypes.LoadFailure });
    }
}


function * init(){
    let response = yield call(api.get, '/account');

    const user: User = {
        id: response.data.id,
        email: response.data.email,
        name: response.data.name,
        avatar: response.data.avatar ? `data:image/png;base64,${response.data.avatar}` : undefined
    };

    response = yield call(api.get, 'app/init');

    const friends: Friend[] = [];
    const talks: Talk[] = [];
    const invitations: Invitation[] = [];

    response.data.friends.forEach((item: Friend) => {
        item.avatar = item.avatar ? `data:image/png;base64,${item.avatar}` : undefined;
        friends.push(item);
    });

    response.data.chats.forEach((item: Talk) => {
        talks.push(item);
    });

    response.data.invitations.forEach((invite: Invitation) => {
        response.data.usersInvitations.forEach((person: Person) => {
            if (invite.userSentId === person.id) {
                person.avatar = person.avatar ? `data:image/png;base64,${person.avatar}` : undefined;
                
                invitations.push({
                    id: invite.id,
                    userSentId: invite.userSentId,
                    person: person                    
                });
            }
        });
    });

    yield put({ type: FriendActionTypes.LoadSuccess, payload: friends });
    yield put({ type: TalkActionTypes.LoadSuccess, payload: talks });
    yield put({ type: UserActionTypes.LoadSuccess, payload: user });
    yield put({ type: InviteActionTypes.LoadSuccessInvites, payload: invitations });
}