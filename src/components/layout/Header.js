import React from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions';

const Header = () => (
  <header id="header">
    <Link className="title" to="/"><h1>Auth App</h1></Link>
    <AuthOptions />
  </header>
);

export default Header;
