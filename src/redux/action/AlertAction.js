import * as ActionTypes from '../ActionType'

export const setAlert = (data) => (dispatch) => {
    dispatch({type : ActionTypes.SET_ALERT  ,payload:data})
}

export const resetAlert = () => (dispatch) => {
    dispatch({type : ActionTypes.RESET_ALERT})
}