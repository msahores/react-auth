import React, { useState, useContext, FormEvent } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import ErrorNotice from '../misc/ErrorNotice';

const Register = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordCheck, setPasswordCheck] = useState<string>();
  const [displayName, setDisplayName] = useState<string>();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newUser = {
        email, password, passwordCheck, displayName,
      };
      await Axios.post(`${process.env.REACT_APP_SERVER_URL}/users/register`, newUser);
      const loginRes = await Axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
        isAuthenticated: true,
      });
      localStorage.setItem('auth-token', loginRes.data.token);
      history.push('/');
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div className="page">
      <h2>Register</h2>
      {error && <ErrorNotice message={error} clearError={() => setError(undefined)} />}
      <form onSubmit={submit} className="register-form form">
        <label htmlFor="register-email">Email</label>
        <input id="register-email" type="email" onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="register-password">Password</label>
        <input id="register-password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <input type="password" placeholder="Verify Password" onChange={(e) => setPasswordCheck(e.target.value)} />
        <label htmlFor="register-display-name">Display name</label>
        <input id="register-display-name" type="text" onChange={(e) => setDisplayName(e.target.value)} />
        <input type="submit" value="Register" />
      </form>
      <div className="error-message">{}</div>
    </div>
  );
};

export default Register;
