import { call, put, takeEvery, takeLatest ,all} from 'redux-saga/effects'
import { signInApi, signUpApi } from '../../common/API/Auth.API';
import * as ActionTypes from '../ActionType'


function* signUp(action) {
   try {
      const user = yield call(signUpApi, action.payload);
      // yield put({type: "USER_FETCH_SUCCEEDED", user: user});
      console.log(user);
   } catch (e) {
      // yield put({type: "USER_FETCH_FAILED", message: e.message});
      console.log(e);
   }
}

function* signIn(action) {
   try{
      const user = yield call(signInApi ,action.payload)
      console.log(user);
   }catch(e){
      console.log(e);
   }
}
export function* watchSignUp() {
  yield takeEvery(ActionTypes.SIGNUP_USER , signUp);
}

export function* watchSignIn(){
   yield takeEvery(ActionTypes.SIGNIN_USER , signIn);
}

export function* authSaga() {
    yield all([
        watchSignUp(),
        watchSignIn()
    ])
}