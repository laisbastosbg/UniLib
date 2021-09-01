import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom'

import Login from 'pages/Login';
import Home from 'pages/Home';

const App = () => {
  const isLoggedIn = () => {
    return localStorage.getItem("auth") === "true" ? true : false
  }

  localStorage.getItem("auth") === "true" ? console.log("true") : console.log("false")

  return (
    <BrowserRouter>
        <Route component={(isLoggedIn ? Home : Login)} path="/" exact />
    </BrowserRouter>
  )
}

export default App;