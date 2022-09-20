import { createContext, useReducer } from "react";
import { Theme_Reducer} from "./reducer/Themereducer";
import { TOOGLE_THEME } from "./ActionTypes";

export const ThemeContext =  createContext()

const initval = {
    theme:'light'
}


const ThemeProvider = ({children}) => {
    const [state, dispatch] = useReducer(Theme_Reducer, initval);

    const toogle_Theme = (val) => {

        let NewTheme = val === 'light' ? 'dark' : 'light'
        dispatch({type:TOOGLE_THEME ,payload:NewTheme})
    }

    return(
        <ThemeContext.Provider
            value={{
                ...state,
                toogle_Theme
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export default  ThemeProvider;
