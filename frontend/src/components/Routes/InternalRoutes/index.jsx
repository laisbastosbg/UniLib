import React from 'react';

import { Switch } from 'react-router-dom';

import PrivateRoute from 'components/Routes/PrivateRoute';
import NavigationDrawer from 'components/Navigation/Drawer';

import Books from 'pages/Books';
import Loans from 'pages/Loans';
import Users from 'pages/Users';
import Students from 'pages/Students';

const InternalRoutes = () => {
  return (
    <Switch>
      <PrivateRoute component={Loans} path="/emprestimos" />
      <PrivateRoute component={Books} path="/livros" />
      <PrivateRoute component={Students} path="/alunos" />
      <PrivateRoute component={Users} path="/usuarios" restricted />
    </Switch>
  )
  
}

export default InternalRoutes;