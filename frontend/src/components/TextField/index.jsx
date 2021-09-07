import React from 'react';

import { StyledTextField } from './styles'

const TextField = ({
  error,
  InputProps,
  label,
  onChange,
  size = "small",
  type,
  variant = "outlined"
}) => {
  return (
    <StyledTextField
      InputProps={InputProps}
      error={error}
      label={label}
      onChange={onChange}
      size={size}
      type={type}
      variant={variant}
    />
  )
}

export default TextField;