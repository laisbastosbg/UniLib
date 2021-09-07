import React from 'react';

import TextField from '@material-ui/core/TextField';

import { StyledAutoComplete } from './styles';

const AutoComplete = ({
  id = "",
  label,
  onChange,
  options = [],
  getOptionLabel,
  value
}) => {
  // (option) => option.title
  return (
    <StyledAutoComplete
      id={id}
      size="small"
      onChange={onChange}
      options={options}
      value={value}
      getOptionLabel={getOptionLabel}
      style={{ width: 140 }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  )
}

export default AutoComplete;