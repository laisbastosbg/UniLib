import React, { useState, useEffect } from 'react';

import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import Title from 'components/Text/Title';
import Table from 'components/Table';

import api from 'services/api';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import MomentUtils from "@date-io/moment";
const moment = require("moment");

const students = require('utils/students')

moment.locale("pt-br")

const Students = () => {
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

  const dateFormatter = str => {
    return str;
  };

  const columns = [
    {
      title: "Matrícula",
      field: "registration",
    },
    {
      title: "Nome",
      field: "name",
    },
    {
      title: "Curso",
      field: "course",
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
            onChange={(e) => {
              return (
                item.onChange(e._i)
              )
            }}
            //formatDate={(date) => moment(date)}
            format="DD/MM/yyyy"
          />
        </MuiPickersUtilsProvider>
      )
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Telefone",
      field: "phone_number",
    },
  ];

  const handleCreate = async (newData) => {
    const headers = {
      login: localStorage.getItem("login"),
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }

    const birthdate = moment(newData.birthdate, "DD/MM/YYYY").format("YYYY-MM-DD")
    console.log("birthdate: ", newData.birthdate)

    try {
      const response = await api.post(
        `/students`,
        {
          name: newData.name,
          registration: newData.registration,
          birthdate,
          course: newData.course,
          email: newData.email,
          phone_number: newData.phone_number,
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

    const birthdate = moment(newData.birthdate, "DD/MM/YYYY").format("YYYY-MM-DD")
    console.log("newData.birthdate: ", newData.birthdate)
    console.log("birthdate: ", birthdate)

    try {
      const response = await api.put(
        `/students/${id}`,
        {
          name: newData.name,
          registration: newData.registration,
          birthdate,
          course: newData.course,
          email: newData.email,
          phone_number: newData.phone_number,
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
        `/students/${id}`,
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
    try {
      const headers = {
        login: localStorage.getItem("login"),
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
      const response = await api.get("/students", { headers });
  
      setData(response.data)
    } catch(error) {
      setData(students)
    }
  } 

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Title>Alunos</Title>
      <Table
        title=""
        columns={columns}
        data={data}
        editable={{
          onRowAdd: (newData) => {},
            // new Promise((resolve) => {
            //   setTimeout(() => {
            //     resolve();
            //     handleCreate(newData);
            //   }, 600);
            // }),
          onRowUpdate: (newData, oldData) => {},
            // new Promise((resolve) => {
            //   setTimeout(() => {
            //     resolve();
            //     if (oldData) {
            //       handleEdit(newData, oldData);
            //     }
            //   }, 600);
            // }),
          onRowDelete: (oldData) => {},
            // new Promise((resolve) => {
            //   setTimeout(() => {
            //     resolve();
            //     handleDelete(oldData);
            //   }, 600);
            // }),
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

export default Students;