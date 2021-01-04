import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';

interface Props {
  condition: boolean,
  component: any, 
  redirectTo: string,
  path?: string, 
  exact?: boolean
}

const ProtectedRoute: FC<Props> = ({ condition = false, component: Component, redirectTo, exact = false, ...rest }) => (
    <Route {...rest} exact render={props => (
      condition ?
          <Component {...rest} {...props} /> : 
          <Redirect to={{ pathname: redirectTo, state: { from: props.location }}} />   
    )} />
  );

export default ProtectedRoute;
