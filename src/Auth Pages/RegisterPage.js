import axios from "axios";
import React, { useState } from "react";
import {useHistory, Link} from 'react-router-dom'
import logincss from './loginPage.module.css'

function LoginPage(props) {
  const [user, setuser] = useState({ name:"",username: "", password: "" });
  const history=useHistory()
  const [error, seterror] = useState('')
  const addUser = (e) => {
    e.preventDefault();
    if(user.name&&user.username&&user.password){  
    
    axios
      .post("http://localhost:5000/auth/register", user, {
        header: { "Component-Type": "application/json" },
      })
      .then((res) => {
        localStorage.setItem("authToken", res.data.token);
        history.push('/restaurants')
      }
      )

      .catch((err) => {
        seterror((prevError)=>prevError=err.response.data.error)
        setTimeout(()=>{seterror('')},6000);
      })}else{
          seterror('Please enter in all the fields');
          setTimeout(()=>{seterror('')},6000)
      };
  };
  return (
    <div style={{ position: "relative", top: "15vh" }}>
      <div className={logincss.loginWrap}>
  <h2 className={logincss.loginWrapH2}>Register</h2>
  {error&&<div className={logincss.error}>{error}</div>}
  <form className={logincss.form} onSubmit={(e)=>{addUser(e)}} >
  <input className={logincss.inputtext}type="text" placeholder="Name" name="n" onChange={(event) => {
            setuser({ ...user, name: event.target.value });
          }} />
    <input className={logincss.inputtext}type="text" placeholder="Username" name="un" onChange={(event) => {
            setuser({ ...user, username: event.target.value });
          }} />
    <input className={logincss.inputPassword} type="password" placeholder="Password" name="pw" onChange={(event) => {
            setuser({ ...user, password: event.target.value });
          }} />
    <input type="submit" className={logincss.loginButton} value="Register"></input>
    <p className={logincss.para}> Already Registered? <Link to='/' styles={{color: 'blue'}} > Login </Link> </p>
    
  </form>
</div>
    </div>
  );
}

export default LoginPage;
