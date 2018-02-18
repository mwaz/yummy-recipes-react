import { Redirect, Route } from 'react-router';
import React from 'react';
import Login from "../components/auth-front/login.js";

const token = window.localStorage.getItem("login")
const Public = ({ component: Values, ...rest }) => (
    <Route {...rest} render={props => ( token==='true' ? 
    <Redirect to={{ pathname: '/categories' }} />:
    <Route exact path="/login" component={Login} />
        

    )} />
)
export default Public