import { call, put } from 'redux-saga/effects';
import api from './../../services/api';
import { AnyAction } from 'redux'
import { InviteActionTypes, Person } from './types';
import { User } from './../User/types';

export function * getPersons(action: AnyAction) {
    try {
        const persons: Person[] = [];
        const response = yield call(api.get, `app/user/${action.search}`);        

        response.data.forEach((user: User) => {
            persons.push({
                id: user.id as number,
                name: user.name as string,
                avatar: user.avatar,
                ehSent: false
            });
        });

        yield put({ type: InviteActionTypes.LoadSuccess, payload: persons });
    } catch {
        yield put({ type: InviteActionTypes.LoadFailure });
    }
}