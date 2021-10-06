import React, { useState, useEffect } from 'react';

import Title from 'components/Text/Title';
import Table from 'components/Table';
import DetailPanel from 'components/DetailPanel';

import api from 'services/api';

import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { SynopsisIcon } from './styles';

const moment = require("moment");

const books = require('utils/books');

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
      title: "ISBN",
      field: "isbn",
      editable: "onAdd",
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
    },
    {
      title: "Sinopse",
      field: "synopsis",
      render: () => <SynopsisIcon />,
      editComponent: (item) => {
        return (
          <TextField
            id="standard-multiline-static"
            label="Multiline"
            multiline
            rows={2}
            inputProps={{ maxLength: 1023 }}
            defaultValue={item.value}
            onChange={(e) => item.onChange(e.target.value)}
          />
        )
      }
    },
    {
      title: "Editora",
      field: "publisher",
    },
    {
      title: "Status",
      field: "status",
      editable: "never"
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
          edition: newData.edition,
          synopsis: newData.synopsis,
        },
        { headers }
      );

      if (response.status !== 201) {
        setOpen(true);
        setErrorText(response.data.error);
      }

      console.log("response: ", response)

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
          edition: newData.edition,
          synopsis: newData.synopsis,
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
    try {
      const headers = {
        login: localStorage.getItem("login"),
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
      const response = await api.get("/books", { headers });
  
      setData(response.data)
    } catch (error) {
      setData(books)
    }
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
            <DetailPanel>
              <p><b>Sinopse: </b>{rowData.synopsis}</p>
            </DetailPanel>
          )
        }}
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
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
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