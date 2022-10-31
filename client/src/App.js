import React from 'react';
import { Container } from '@material-ui/core';
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

function App() {
  const user = JSON.parse(localStorage.getItem('profile'));
  return (

    <BrowserRouter>
      <Container maxidth="xl">
        <Navbar />
        <Routes>
          <Route exact path="/" element={() => <Navigate to="/posts"/>} />
          <Route exact path="/posts"  element={ <Home /> } />
          <Route exact path="/posts/search"  element={<Home />} />
          <Route exact path="/posts/:id"  element={<PostDetails/>} />
          <Route exact path="/auth"  element={ () => (!user ? <Auth /> : <Navigate to="/posts" />)} />
          {/*<Route path="/auth" exact component={() => (!user ? <Auth /> : <Naviate to="/posts" />)} /> */}
          
        </Routes>
      </Container>
    </BrowserRouter>
   
    
  );
}

export default App;
