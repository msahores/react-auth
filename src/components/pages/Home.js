import React, { useContext } from 'react'
import UserContext from '../../context/UserContext';

const Home = () => {
  const {userData} = useContext(UserContext);
  return (
    <div className="page">
      <h1>Home Page</h1>
     {userData.user && 'Hello '}
     {userData?.user?.displayName}   
    </div>
  )
}

export default Home;
  