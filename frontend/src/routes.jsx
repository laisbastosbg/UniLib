import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom'

import PrivateRoute from 'components/Routes/PrivateRoute';

import Login from 'pages/Login';
import Home from 'pages/Home';

const App = () => {
  localStorage.getItem("auth") === "true" ? console.log("true") : console.log("false")

  return (
    <BrowserRouter>
      <Route component={Login} path="/" exact />
      <PrivateRoute component={Home} path="/emprestimos" exact />
    </BrowserRouter>
  )
}

export default App;