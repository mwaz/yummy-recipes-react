import { Redirect, Route } from 'react-router';
import React from 'react';
const Private = ({ component: Values, ...rest }) => (
    <Route {...rest} render={props => (
        window.localStorage.getItem("token") ? (<Values {...props} />
        ) : (
                <Redirect to={{
                    pathname: '/login',
                }} />
            )
    )} />
)
export default Private