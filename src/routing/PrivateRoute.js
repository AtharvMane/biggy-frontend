import axios from 'axios';
import React, {useEffect, useState} from 'react'
import LoadingPage from './LoadingPage'

import { Route,Redirect } from 'react-router-dom'

const PrivateRoute = ({component:Component,usertype,...rest}) => {
    const token=localStorage.getItem("authToken")
    const [isAuth, setisAuth] = useState(false);
    const [loading, setloading] = useState(true)
useEffect(() => {
    let isVerifying=true
    if(token){
    
    axios.get(`http://localhost:5000/private/${usertype}`,{headers:{"Authorization":`Bearer ${token}`}})
    .then((res,req)=>{if(isVerifying){setisAuth(res.data.success); setloading(false); }})
    
    .catch((err)=>{console.log(err);setloading(false)})
    }else{setloading(false)}
    return ()=>isVerifying=false
},[token,usertype])

if(!loading){


    return (
        
        <Route {...rest} render={(props)=> (token&&isAuth)?<Component {...rest} {...props} />:<Redirect to='/'/>}/>
        
    )
} else{ return <LoadingPage/>}
}
export default PrivateRoute
