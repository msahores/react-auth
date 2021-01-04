import React, { useContext, FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import UserContext from '../../context/UserContext';

interface Props {
  component: any, 
  path: string
}

const ProtectedRoute:FC<Props> = ({ component: Component, ...rest }) => {
  const { userData } = useContext(UserContext);
  return (
  <Route {...rest} render={props => (
     userData.isAuthenticated === true ? 
        <Component {...rest} {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />   
  )} />
);
  }

export default ProtectedRoute;
