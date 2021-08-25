import axios from "axios";
import React, { useState } from "react";
import {useHistory, Link} from 'react-router-dom'
import logincss from './loginPage.module.css'

function RestaurantRegisterPage(props) {
  const [user, setuser] = useState({ name:"",email: "", password: "",score:0 });
  const history=useHistory()
  const [error, seterror] = useState('')
  const addUser = (e) => {
    e.preventDefault();
    if(user.name&&user.email&&user.password){  
    
    axios
      .post("https://biggy-backend.herokuapp.com/RestaurantSide/register", user, {
        header: { "Component-Type": "application/json" },
      })
      .then((res) => {
        localStorage.setItem("authToken", res.data.token);
        history.push(`/restaurantsSide/${res.data.id}`);
      }
      )

      .catch((err) => {
        console.log(err.response.data)
        seterror((prevError)=>prevError=err.response.data.error||err.response.data.errors.email.message)
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
    <input className={logincss.inputtext}type="text" placeholder="email" name="un" onChange={(event) => {
            setuser({ ...user, email: event.target.value });
          }} />
    <input className={logincss.inputPassword} type="password" placeholder="Password" name="pw" onChange={(event) => {
            setuser({ ...user, password: event.target.value });
          }} />
    <input type="submit" className={logincss.loginButton} value="Register"></input>
    <p className={logincss.para}> Already Registered? <Link to='/restaurantLogin' styles={{color: 'blue'}} > Login </Link> </p>
    
  </form>
</div>
    </div>
  );
}

export default RestaurantRegisterPage;
