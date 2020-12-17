import React, {useState, useEffect} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Axios from 'axios';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/layout/Header';
import UserContext from './context/UserContext';
import { baseUrl } from './utils/baseUrl';
import "./style.css";

//rafce
const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });
  useEffect(()=>{
    const checkLoggedIn = async()=> {
      let token = localStorage.getItem("auth-token");
      if(token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(baseUrl + '/users/tokenIsValid', null, {
        headers: {"x-auth-token": token}
      })
      if(tokenRes.data){
        const userRes = await Axios.get(baseUrl + "/users", {headers: {"x-auth-token": token}});
        //console.log("User Res:", userRes);
        setUserData({
          token, 
          user: userRes.data
        })
      } 
    }
    checkLoggedIn();
  }, []);
  return <>
    <BrowserRouter>
      <UserContext.Provider value={{userData, setUserData}}>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
        </UserContext.Provider>
    </BrowserRouter>
  </>
}

export default App;
