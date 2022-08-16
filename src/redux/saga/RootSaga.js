import { call, put, takeEvery, takeLatest ,all} from 'redux-saga/effects'
import { authSaga } from './Auth.saga'

export function* RootSaga() {
    yield all([
        authSaga()
    ])
}