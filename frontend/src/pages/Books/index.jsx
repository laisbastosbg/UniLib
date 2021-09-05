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

const Books = () => {
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
      title: "Título",
      field: "title",
    },
    {
      title: "Autor",
      field: "author",
    },
    {
      title: "Edição",
      field: "edition",
      type: "date",
    },
    {
      title: "Sinopse",
      field: "status",
      type: "text"
    },
    {
      title: "Status",
      field: "status",
    },
  ];

  const handleCreate = async (newData) => {
    const headers = {
      login: localStorage.getItem("login"),
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }

    try {
      const response = await api.post(
        `/books`,
        {
          title: newData.title,
          author: newData.author,
          publisher: newData.publisher,
          isbn: newData.isbn,
          // edition: newData.edition,
          // synopsis: newData.synopsis,
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
        `/books/${id}`,
        {
          title: newData.title,
          author: newData.author,
          publisher: newData.publisher,
          isbn: newData.isbn,
          // edition: newData.edition,
          // synopsis: newData.synopsis,
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
        `/books/${id}`,
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
    const response = await api.get("/books", { headers });

    setData(response.data)
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Title>Livros</Title>
      <Table
        title=""
        columns={columns}
        data={data}
        detailPanel={rowData => {
          return (
            <div>
              <p><b>Editora: </b>{rowData.publisher}</p>
              <p><b>ISBN: </b>{rowData.isbn}</p>
              <p><b>Sinopse: </b>{rowData.synopsis}</p>
            </div>
          )
        }}
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

export default Books;