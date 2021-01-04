import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/layout/Header';
import UserContext, { UserDataI } from './context/UserContext';
import './style.css';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [userData, setUserData] = useState<UserDataI>({
    token: undefined,
    user: undefined,
    isAuthenticated: false,
  });

  useEffect(() => {

    const checkLoggedIn = async () => {
      let token:string | null = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
        setIsLoading(false);
      } else {
        const tokenRes = await Axios.post(`${process.env.REACT_APP_SERVER_URL}/users/tokenIsValid`, null, {
          headers: { 'x-auth-token': token },
        });
        if (tokenRes?.data) {
          const userRes = await Axios.get(`${process.env.REACT_APP_SERVER_URL}/users`, { headers: { 'x-auth-token': token } });
          setUserData({
            token,
            user: userRes.data,
            isAuthenticated: true,
          });
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
    };
    
    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{userData, setUserData}}>
          <Header />
          <div className="container">
          {isLoading ? <h1>Loading...</h1> : (
            <Switch>
              <ProtectedRoute 
                condition={userData.isAuthenticated} 
                path="/" 
                redirectTo='/login' 
                component={Home} exact 
              /> 
              <ProtectedRoute 
                condition={!userData.isAuthenticated} 
                path="/login" 
                redirectTo='/' 
                component={Login} 
              />
              <ProtectedRoute 
                condition={!userData.isAuthenticated} 
                path="/register" 
                redirectTo='/' 
                component={Register} 
              /> 
            </Switch>
            )}
          </div>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
