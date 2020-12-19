import React, { useContext } from 'react'
import UserContext from '../../context/UserContext';

const Home = () => {
  const {userData} = useContext(UserContext);
  return (
    <div className="page">
     {userData.user && 'Hello '}
     {userData?.user?.displayName}   
    </div>
  )
}

export default Home;
  