import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isLogin } from '../utility/Index';

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
                :
                <Redirect to={"/Auth"} />
        )
        }

        />
    );
}

export default PrivateRoute;