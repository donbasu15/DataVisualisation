import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './App.css'
const Login = () =>{
    let [username,setUsername] = useState('admin');
    let [password,setPassword] = useState('admin123');
    let [message,setMessage] = useState(false);
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
        }else{
            setMessage(true);
        }
      
  
    }
    return(
     <>
        <div className="loginPage">
           {message ? <b>Invalid Credential</b> : ''}
           <form onSubmit={handleSubmit} className="loginForm">
                <input name="username" type="text" value={username} onChange={changeUser}/>
               <br /> <br /> <input name="password" type="password" value={password} onChange={changePass}/>
              <br /> <br /> <button>Login</button>
                
            </form> 
        </div>
        
     </>
    )
}

export default Login