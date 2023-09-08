import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import Login  from './Pages/Login'; 
import Register from './Pages/Register';
import Home from './Pages/Home';
import Table from './Pages/Table';

class App extends Component {
  render(){  
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/table" element={<Table />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
