import React from 'react';
import {Link} from "react-router-dom";
import AuthOptions from '../auth/AuthOptions';

const Header = () => {
  return (
    <header id="header">
      <Link className="title" to="/"><h1>Mern auth todo app</h1></Link>
      <AuthOptions />
    </header>
  )
}

export default Header;