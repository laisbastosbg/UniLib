import React from 'react';

import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();

  const handleLogin = () => {
    // localStorage.setItem("auth", "true");
    // localStorage.setItem("profile", "administrador");
    history.push("/emprestimos")
  }

  console.log("login")
  return (
    <>
      <h1>Página de Login</h1>
      <button onClick={handleLogin}>entrar</button>
    </>
  )
}

export default Login;