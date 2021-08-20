import axios from "axios";

import React, { useState } from "react";
import {useHistory, Link} from 'react-router-dom'
import logincss from './loginPage.module.css'

function LoginPage(props) {

  const [user, setuser] = useState({ username: "", password: "" });
  const [error, seterror] = useState("")
  const history=useHistory()

  const addUser = (e) => {
      
    e.preventDefault();
    axios
      .post("http://localhost:5000/auth/login", user, {
        header: { "Component-Type": "application/json" },
      })
      .then((res) => {
        localStorage.setItem("authToken", res.data.token);
        history.push('/restaurants')
      }
      )

      .catch((err) => {

        seterror((prevError)=>prevError=err.response.data.error)
        setTimeout(()=>{seterror('')},6000)

      });
  };

  return (
    <div style={{ position: "relative", top: "15vh" }}>
      <div className={logincss.loginWrap}>
  <h2 className={logincss.loginWrapH2}>Login</h2>
  {error&&<div className={logincss.error}>{error}</div>}
  
  <form className={logincss.form} onSubmit={(e)=>{addUser(e)}} >
    <input className={logincss.inputtext}type="text" placeholder="Username" name="un" onChange={(event) => {
            setuser({ ...user, username: event.target.value });
          }} />
    <input className={logincss.inputPassword} type="password" placeholder="Password" name="pw" onChange={(event) => {
            setuser({ ...user, password: event.target.value });
          }} />
    <button className={logincss.loginButton}> Sign in </button>
    <p className={logincss.para}> Don't have an account? <Link to='/user/register' styles={{color: 'blue'}} > Register </Link> </p>
    <p className={logincss.para}> <Link to='/restaurantLogin' styles={{color: 'blue'}} > Login as an Affiliated Restaurant </Link> </p>
    
  </form>
</div>
    </div>
  );
}

export default LoginPage;
