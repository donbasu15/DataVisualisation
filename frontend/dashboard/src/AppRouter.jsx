import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminApp from './AdminApp';
import UserApp from './UserApp';
import Login from './Login';
const AppRouter = ()=>{
    return(
        <Router>
          <Routes>
           <Route path="/userdashboard" element={<UserApp/>} />
           <Route path="/admindashboard" element={<AdminApp/>} />
           <Route path="/login" element={<Login/>} />
           </Routes>
        </Router>
    )
}

export default AppRouter