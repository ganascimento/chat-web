import { all, takeLatest } from 'redux-saga/effects';
import { UserActionTypes } from './User/types';
import { InviteActionTypes } from './Invite/types';
import { login, load, register } from './User/sagas';
import { getPersons } from './Invite/sagas';

export default function * rootSaga() {
    return yield all([
        takeLatest(UserActionTypes.LoginRequest, login),
        takeLatest(UserActionTypes.LoadRequest, load),
        takeLatest(UserActionTypes.RegisterRequest, register),
        takeLatest(InviteActionTypes.LoadRequest, getPersons)
    ]);
}