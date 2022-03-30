import React from 'react';
import { Container } from '@material-ui/core';
import {BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth'



function App() {
  
  return (
    <BrowserRouter>
      <Container maxidth="lg">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Container>
    </BrowserRouter>
   
    
  );
}

export default App;
