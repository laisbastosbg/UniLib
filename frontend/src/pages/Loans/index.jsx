import React, { useState, useEffect } from 'react';

import Title from 'components/Text/Title';
import Table from 'components/Table';
import DetailPanel from 'components/DetailPanel';
import BooksAutoComplete from 'components/AutoComplete/BooksAutoComplete';
import StudentsAutoComplete from 'components/AutoComplete/StudentsAutoComplete';
import Switch from 'components/Switch';

// import api from 'services/api';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
const moment = require("moment");
const loans = require('utils/loans')

moment.locale("pt-br")

const Loans = () => {
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
      editable: "never"
    },
    {
      title: "Livro",
      field: "book",
      editable: "onAdd",
      editComponent: (item) => {
        return (
          <BooksAutoComplete
            value={item.value}
            onChange={(event, value) => { item.onChange(value) }}
          />
        )
      }
    },
    {
      title: "Aluno",
      field: "student",
      editable: "onAdd",
      editComponent: (item) => {
        return (
          <StudentsAutoComplete
            onChange={(event, value) => { item.onChange(value) }}
          />
        )
      }
    },
    {
      title: "Prev. Devolução",
      field: "estimated_return_date",
      type: "date",
      editable: "never",
      render: ({ estimated_return_date }) => {
        return (
          moment(estimated_return_date).format("DD/MM/YYYY")
        )
      }
    },
    {
      title: "Status",
      field: "status",
      editable: "onUpdate",
      editComponent: (item) => {
        return (
          <Switch value={item.value} />
        )
      }
    },
  ];

  // const handleCreate = async (newData) => {
  //   const headers = {
  //     login: localStorage.getItem("login"),
  //     Authorization: `Bearer ${localStorage.getItem("token")}`
  //   }

  //   const student_id = newData.student.id;
  //   const book_id = newData.book.id;
  //   const user_id = localStorage.getItem("id");

  //   try {
  //     const response = await api.post(
  //       `/loans`,
  //       {
  //         student_id,
  //         book_id,
  //         user_id
  //       },
  //       { headers }
  //     );

  //     if (response.status !== 201) {
  //       setOpen(true);
  //       setErrorText(response.data.error);
  //     }

  //     fetchData(data);
  //   } catch (error) {
  //     alert(error)
  //   }
  // }

  // const handleEdit = async (newData, oldData) => {
  //   const headers = {
  //     login: localStorage.getItem("login"),
  //     Authorization: `Bearer ${localStorage.getItem("token")}`
  //   }

  //   const id = newData.id;

  //   try {
  //     const response = await api({
  //       method: 'patch',
  //       url: `/loans/${id}`,
  //       headers
  //     });

  //     if (response.status !== 200) {
  //       setOpen(true);
  //       setErrorText(response.data.error);
  //     }

  //     fetchData(data);
  //   } catch (error) {
  //     alert(error)
  //   }
  // }

  // const handleDelete = async (oldData) => {
  //   const headers = {
  //     login: localStorage.getItem("login"),
  //     Authorization: `Bearer ${localStorage.getItem("token")}`
  //   }

  //   const id = oldData.id;

  //   try {
  //     const response = await api.delete(
  //       `/loans/${id}`,
  //       { headers }
  //     );

  //     if (response.status !== 204) {
  //       setOpen(true);
  //       setErrorText(response.data.error);
  //     }

  //     fetchData(data);
  //   } catch (error) {
  //     alert(error)
  //   }
  // }

  const fetchData = async () => {
    // try {
    //   const headers = {
    //     login: localStorage.getItem("login"),
    //     Authorization: `Bearer ${localStorage.getItem("token")}`
    //   }
    //   const response = await api.get("/loans", { headers });
  
    //   setData(response.data)
    // } catch(error) {
      setData(loans)
    // }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Title>Empréstimos</Title>
      <Table
        title=""
        columns={columns}
        data={data}
        detailPanel={rowData => {
          return (
            <DetailPanel>
              <p><b>Data do empréstimo: </b>{moment(rowData.createdAt).format("DD/MM/YYYY")}</p>
              <p><b>Data da devolução: </b>{rowData.return_date}</p>
              <p><b>Empréstimo realizado por: </b>{rowData.user}</p>
              <p><b>Multa: </b>R$ {rowData.fine}</p>
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

export default Loans;