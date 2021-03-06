import React, { useState, useContext } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import ErrorNotice from '../misc/ErrorNotice';

const Login = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState();
  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  const submit = async (e: any) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, loginUser);
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
        isAuthenticated: true, 
      });
      localStorage.setItem('auth-token', loginRes.data.token);
      history.push('/');
    } catch (err) {
      err?.response?.data?.msg && setError(err?.response?.data?.msg);
    }
  };
  return (
    <div className="page">
      <h2>Login</h2>
      {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
      <form onSubmit={submit} className="login-form form">
        <label htmlFor="login-email">Email</label>
        <input id="login-email" type="email" onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="login-password">Password</label>
        <input id="login-password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="Login" />
      </form>
      <div className="error-message">{}</div>
    </div>
  );
};

export default Login;
