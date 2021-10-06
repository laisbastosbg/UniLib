import React, { useState, useEffect } from 'react';

import DefaultAutoComplete from 'components/AutoComplete/DefaultAutoComplete';

import api from 'services/api';

const books = require('utils/books');

const BooksAutoComplete = ({ onChange, value }) => {
  const [options, setOptions] = useState([]);

  const fetchData = async () => {
    try {
      const headers = {
        login: localStorage.getItem("login"),
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
      const response = await api.get("/books", { headers });
  
      setOptions(response.data)
    } catch(error) {
      setOptions(books)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const label = "Livros";

  const getOptionLabel = (option) => option.title;
  return (
    <DefaultAutoComplete
      id="books-autocomplete"
      label={label}
      onChange={onChange}
      options={options}
      value={value}
      getOptionLabel={getOptionLabel}
    />
  )
}

export default BooksAutoComplete;