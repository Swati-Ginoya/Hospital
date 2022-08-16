import * as ActionTypes from '../ActionType'


export const signUpAction = (values) => (dispatch) => {
    dispatch({type : ActionTypes.SIGNUP_USER ,payload:values})
}