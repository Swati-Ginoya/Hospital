import * as ActionTypes from '../ActionType'

const initval = {
    isloading: false,
    error: '',
    user: null
}

export const AuthReducer = (state = initval, action) => {
    switch (action.type) {
        case ActionTypes.SIGNEDIN_USER:
            return {
                ...state,
                isloading: false,
                error: '',
                user: action.payload
            }

        case ActionTypes.SIGNOUT_USER:
            return {
                ...state,
                isloading: false,
                error: '',
                user: null
            }
        default:
            return state
    }
}