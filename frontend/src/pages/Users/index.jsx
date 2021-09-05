import React, { useState, useEffect } from 'react';

import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import Title from 'components/Text/Title';
import Table from 'components/Table';

import api from 'services/api';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import MomentUtils from "@date-io/moment";
const moment = require("moment");

moment.locale("pt-br")

const Users = () => {
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [errorText, setErrorText] = useState("");

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const columns = [
    {
      title: "COD",
      field: "id",
      editable: "never",
    },
    {
      title: "Nome",
      field: "name",
    },
    {
      title: "Username",
      field: "login",
    },
    {
      title: "Nascimento",
      field: "birthdate",
      type: "date",
      render: ({ birthdate }) => {
        return (
          moment.utc(birthdate).format("DD/MM/YYYY")
        )
      },
      editComponent: (item) => (
        <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale="br">
          <KeyboardDatePicker
            value={item.birthdate}
            onChange={(e) => {
              console.log(item.value)
              console.log(e)
              return (
                item.onChange(e._i)
              )
            }}
            format="DD/MM/yyyy"
          />
        </MuiPickersUtilsProvider>
      )
    },
    {
      title: "Admissão",
      field: "createdAt",
      type: "date",
      editable: "never",
      render: ({ createdAt }) => {
        return (
          moment.utc(createdAt).format("DD/MM/YYYY")
        )
      }
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Telefone",
      field: "phone_number",
    },
    {
      title: "CPF",
      field: "cpf",
    },
    {
      title: "Perfil",
      field: "profile",
      lookup: {
        "administrador": "Administrador",
        "bibliotecario": "Bibliotecário"
      },
    },
    {
      title: "Senha",
      field: "password",
      render: (item) => <p>**********</p>
    },
  ];

  const handleCreate = async (newData) => {
    const headers = {
      login: localStorage.getItem("login"),
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }

    try {
      const response = await api.post(
        `/users`,
        {
          login: newData.login,
          name: newData.name,
          cpf: newData.cpf,
          email: newData.email,
          phone_number: newData.phone_number,
          password: newData.password,
          birthdate: moment(newData.birthdate).format("YYYY-MM-DD"),
          profile: newData.profile,
        },
        { headers }
      );

      if (response.status !== 201) {
        setOpen(true);
        setErrorText(response.data.error);
      }

      fetchData(data);
    } catch (error) {
      alert(error)
    }
  }

  const handleEdit = async (newData, oldData) => {
    const headers = {
      login: localStorage.getItem("login"),
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }

    const id = newData.id;

    try {
      const response = await api.put(
        `/users/${id}`,
        {
          login: newData.login,
          name: newData.name,
          cpf: newData.cpf,
          email: newData.email,
          phone_number: newData.phone_number,
          password: newData.password,
          birthdate: moment(newData.birthdate).format("YYYY-MM-DD"),
          profile: newData.profile,
        },
        { headers }
      );

      if (response.status !== 200) {
        setOpen(true);
        setErrorText(response.data.error);
      }

      fetchData(data);
    } catch (error) {
      alert(error)
    }
  }

  const handleDelete = async (oldData) => {
    const headers = {
      login: localStorage.getItem("login"),
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }

    const id = oldData.id;

    try {
      const response = await api.delete(
        `/users/${id}`,
        { headers }
      );

      if (response.status !== 204) {
        setOpen(true);
        setErrorText(response.data.error);
      }

      fetchData(data);
    } catch (error) {
      alert(error)
    }
  }

  const fetchData = async () => {
    const headers = {
      login: localStorage.getItem("login"),
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
    const response = await api.get("/users", { headers });

    setData(response.data)
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Title>Usuários</Title>
      <Table
        title=""
        columns={columns}
        data={data}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                handleCreate(newData);
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  handleEdit(newData, oldData);
                }
              }, 600);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              setTimeout(() => {
                resolve();
                handleDelete(oldData);
              }, 600);
            }),
        }}
        localizationBody={{
          emptyDataSourceMessage: "Nenhum registro para exibir",
          editRow: {
            deleteText: "Tem certeza que deseja remover esse registro?",
          },
          addTooltip: "Registrar Empréstimo",
          deleteTooltip: "Remover Registro",
          editTooltip: "Editar Registro",
        }}
        options={{
          addRowPosition: "first",
          actionsColumnIndex: -1,
          search: true,
        }}
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {errorText}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Users;