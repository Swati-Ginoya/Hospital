import { call, put, takeEvery, takeLatest ,all} from 'redux-saga/effects'
import { googleSignInApi, signInApi, signOutApi, signUpApi } from '../../common/API/Auth.API';
import { history } from '../../History';
import { resetAlert, setAlert } from '../action/AlertAction';
import { signedInAction, signedOutAction } from '../action/AuthAction';
import * as ActionTypes from '../ActionType'


function* signUp(action) {
   try {
      const user = yield call(signUpApi, action.payload);
      yield put(setAlert({text:user.payload ,color: "success"}))
      // yield put({type: "USER_FETCH_SUCCEEDED", user: user});
      console.log(user);
   } catch (e) {
      yield put(setAlert({text:e.payload ,color:"error"}))
      // yield put({type: "USER_FETCH_FAILED", message: e.message});
      console.log(e);
   }
}

function* signIn(action) {
   try{
      const user = yield call(signInApi ,action.payload)
      yield put(signedInAction(user))
      history.push("/")
      yield put(setAlert({text:"Login Successfully" ,color: "success"}))
      console.log(user);
   }catch(e){
      console.log(e);
      yield put(setAlert({text:e.payload ,color : "error"}))
   }
}

function* signOut(action) {
   try{
      const user = yield call(signOutApi, action.payload)
      yield put(signedOutAction(user))
      history.push("/")
      yield put(setAlert({text:"Log Out Successfully" ,color:"success"}))
      console.log(user);
   }catch(e){
      yield put(setAlert({text:e.payload ,color : "error"}))
   }
}

function* googleSignIn(action) {
   try{
      const user = yield call (googleSignInApi)
      yield put(setAlert({text:user.payload,color:"success"}))
   }catch(e){
      yield put(setAlert({text:e.payload ,color : "error"}))
   }
}
export function* watchSignUp() {
  yield takeEvery(ActionTypes.SIGNUP_USER , signUp);
}

export function* watchSignIn(){
   yield takeEvery(ActionTypes.SIGNIN_USER , signIn);
}

export function* watchSignOut(){
   yield takeEvery (ActionTypes.SIGNOUT_USER ,signOut)
}

export function* watchGoogleSignIn(){
   yield takeEvery (ActionTypes.GOOGLESIGNIN_USER ,googleSignIn)
}

export function* authSaga() {
    yield all([
        watchSignUp(),
        watchSignIn(),
        watchSignOut(),
        watchGoogleSignIn()
    ])
}