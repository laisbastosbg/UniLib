import React, { useState, useEffect } from 'react';

import DefaultAutoComplete from 'components/AutoComplete/DefaultAutoComplete';

import api from 'services/api';

const students = require('utils/students')

const StudentsAutoComplete = ({ onChange }) => {
  const [options, setOptions] = useState([]);

  const fetchData = async () => {
    try {
      const headers = {
        login: localStorage.getItem("login"),
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
      const response = await api.get("/students", { headers });
  
      setOptions(response.data)
    } catch(error) {
      setOptions(students)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const label = "Alunos";

  const getOptionLabel = (option) => option.name;
  return (
    <DefaultAutoComplete
      id="students-autocomplete"
      label={label}
      onChange={onChange}
      options={options}
      getOptionLabel={getOptionLabel}
    />
  )
}

export default StudentsAutoComplete;