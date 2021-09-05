import React, { useState } from 'react';

import { useHistory } from "react-router-dom";

import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Form from 'components/Form';
import TextField from 'components/TextField';
import Button from 'components/Button';

import { Image, Paper } from './styles';

import Logo from 'assets/Logo.png';

import api from 'services/api';

const LoginForm = ({ setErrorText, setOpen }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoginError(false);
    setPasswordError(false)

    const params = {
      login,
      password
    }
    const response = await api.post("users/auth", params);
    const { data, status } = response;

    localStorage.setItem("auth", data.auth);
    localStorage.setItem("profile", data.profile);
    localStorage.setItem("token", data.token);
    localStorage.setItem("login", data.login);
    localStorage.setItem("id", data.id);

    if (status === 200) {
      history.push("/emprestimos")
    } else if (status === 401) {
      setPasswordError(true)
    } else if (status === 404) {
      setLoginError(true)
    }

    setOpen(true)
    setErrorText(data.error)
  }

  return (
    <Paper>
      <Image src={Logo} />
      <Form onSubmit={onSubmit}>
        <TextField
          error={loginError}
          label="Usuário"
          onChange={(e) => setLogin(e.target.value)}
        />
        <TextField
          error={passwordError}
          label="Senha"
          type={showPassword ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}

        />
        <Button type="submit">Entrar</Button>
      </Form>
      <p>Caso tenha esquecido sua senha, entre em contato com o administrador do sistema.</p>
    </Paper>
  )
}

export default LoginForm;