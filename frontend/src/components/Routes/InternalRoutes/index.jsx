import React from 'react';

import { Switch } from 'react-router-dom';

import PrivateRoute from 'components/Routes/PrivateRoute';

import Books from 'pages/Books';
import Loans from 'pages/Loans';
import Users from 'pages/Users';
import Students from 'pages/Students';

const InternalRoutes = () => {
  return (
    <Switch>
      <PrivateRoute render={() => <Loans />} path="/emprestimos" />
      <PrivateRoute render={() => <Books />} path="/livros" />
      <PrivateRoute render={() => <Students />} path="/alunos" />
      <PrivateRoute render={() => <Users />} path="/usuarios" restricted />
    </Switch>
  )

}

export default InternalRoutes;