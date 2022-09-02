import * as ActionTypes from '../ActionType'


export const signUpAction = (values) => (dispatch) => {
    dispatch({type : ActionTypes.SIGNUP_USER ,payload:values})
}

export const signInAction = (values) => (dispatch) => {
    dispatch({type : ActionTypes.SIGNIN_USER ,payload:values})
}

export const signedInAction = (values) => (dispatch) => {
    dispatch({type : ActionTypes.SIGNEDIN_USER ,payload:values})
}

export const signOutAction = () => (dispatch) => {
    dispatch({type : ActionTypes.SIGNOUT_USER})
}

export const signedOutAction = () => (dispatch) =>{
    dispatch({type : ActionTypes.SIGNEDOUT_USER})
}

export const googleSignInAction = () => (dispatch) => {
    dispatch({type :ActionTypes.GOOGLESIGNIN_USER})
}