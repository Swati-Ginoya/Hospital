import { TOOGLE_THEME } from "../ActionTypes";


export const Theme_Reducer = (state ,action) => {
    switch (action.type) {
        case TOOGLE_THEME:
            return{
                ...state,
                theme:action.payload
            }
    
        default:
            return state
    }
}