import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';

const AuthOptions = () => {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();
  const register = () => history.push('/register');
  const login = () => history.push('/login');
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
      isAuthenticated: false,
    });
    localStorage.setItem('auth-token', '');
  };
  return (
    <nav className="auth-options">
      { userData.user
        ? <button type="button" onClick={logout}>Log Out</button>
        : (
          <>
            <button type="button" onClick={register}>Register</button>
            <button type="button" onClick={login}>Login</button>
          </>
        )}
    </nav>
  );
};

export default AuthOptions;
