import styled from 'styled-components';

import MSelect from '@material-ui/core/Select';

export const Select = styled(MSelect)`
  max-height: 40px;
  width: 226px;
  & {
    text-align: left;
    color: light grey;
  }
  margin: 7px 5px;
`;
