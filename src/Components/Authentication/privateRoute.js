import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie'; 

const isAuthenticated = () => {
  const token = Cookies.get('token'); 
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp < Date.now() / 1000) return false; 
    return true;
  } catch (error) {
    return false;
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
