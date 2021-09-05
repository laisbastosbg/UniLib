import React from 'react';

import {
  Select as StyledSelect,
} from './styles';

const Select = ({
  variant,
  size,
  value,
  onChange,
  children
}) => {
  return (
    <StyledSelect
      labelId="demo-simple-select-label"
      variant={variant}
      size={size}
      value={value}
      onChange={onChange}
    >
      {children}
    </StyledSelect>
  );
}

export default Select;
