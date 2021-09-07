import React from 'react';

import { StyledButton } from './styles';

const Button = ({
  children,
  color = "primary",
  variant = "contained",
  type
}) => {
  return (
    <StyledButton color={color} type={type} variant={variant}>
      {children}
    </StyledButton>
  )
}

export default Button;