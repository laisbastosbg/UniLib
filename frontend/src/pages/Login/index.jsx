import React from 'react';

const Login = () => {
  const handleLogin = () => {
    localStorage.setItem("auth", "true");
    localStorage.setItem("profile", "administrador");
  }
  return (
    <>
      <h1>Página de Login</h1>
      <button onClick={handleLogin}>entrar</button>
    </>
  )
}

export default Login;