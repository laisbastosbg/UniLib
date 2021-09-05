import React from 'react';

// import { Container } from './styles';

import Typography from '@material-ui/core/Typography';

const Title = ({ children }) => {
  return (
    <Typography variant="h2" component="h1">
      {children}
    </Typography>
  );
}

export default Title;