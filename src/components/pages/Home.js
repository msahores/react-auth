import React, { useContext, useEffect } from 'react'
import UserContext from '../../context/UserContext';

const Home = () => {
  const { userData, setUserData } = useContext(UserContext);
  useEffect(()=>{
    console.log(userData);
  }, [userData]);
  return (
    <div className="page">
     Hello {userData?.user?.displayName}   
    </div>
  )
}

export default Home