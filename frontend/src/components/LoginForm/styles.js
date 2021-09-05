import styled from 'styled-components';

import MPaper from '@material-ui/core/Paper';

export const Paper = styled(MPaper)`
  padding: 3.125rem;
  width: 22rem;
  height: 28.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    text-align: center;
  }
`;

export const Image = styled.img`
  width: 15.3125rem;
  flex: 1; 
`;