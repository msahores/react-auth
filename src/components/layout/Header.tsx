import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions';

const Header: FC = () => (
  <header id="header">
    <Link className="title" to="/"><h1>Auth App</h1></Link>
    <AuthOptions />
  </header>
);

export default Header;
