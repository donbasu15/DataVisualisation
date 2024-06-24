import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Login = () =>{
    let [username,setUsername] = useState('admin');
    let [password,setPassword] = useState('admin123');
    let navigate = useNavigate();

    const changeUser = (event)=>{
        setUsername(event.target.value)
    }
    const changePass = (event)=>{
        setPassword(event.target.value)
    }
    const handleSubmit=async (event)=>{
        event.preventDefault();
       
        const response = await axios.post('http://localhost:8000/login',{
                username:username,
                password:password
             },
        );
        if(response.data.url){
            navigate(response.data.url)
        }
      
  
    }
    return(
        <>
           <form onSubmit={handleSubmit}>
                <input name="username" type="text" value={username} onChange={changeUser}/>
                <input name="password" type="password" value={password} onChange={changePass}/>
                <button>Login</button>
                
            </form> 
        </>
    )
}

export default Login