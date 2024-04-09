import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'mobx-react';
import './App.css'
import Employees from './Employees/ShowEmployees';
import Login from './Employees/Login';
import AddRole from './Employees/AddRole';


function App() {

  return (

    <Router>
      <Routes >
        <Route path="/" element={<Employees />} />
        <Route path="/employees/*" element={<Employees />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/add-role" element={<AddRole/>}/>
      </Routes >
    </Router>

  );
}

export default App
