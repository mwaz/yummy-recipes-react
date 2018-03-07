import { Redirect, Route } from 'react-router';
import React from 'react';

/**
 * Component responsible for protecting routes
 */
const Private = ({ component: Values, ...rest }) => (
  <Route
    {...rest}
    render={props => (
          window.localStorage.getItem('token') ? 
          (<Values {...props} />) :
           (<Redirect to={{ pathname: '/login' }} />
        ))}
  />
);
export default Private