import styled from 'styled-components';

import MTextField from '@material-ui/core/TextField';

export const StyledTextField = styled(MTextField)`
  width: 245px;
  height: 40px;

  & {
    background-color: #ffffff
  }

  & .MuiOutlinedInput-root {
    &:hover fieldset {
      border: 2.5px solid #3f51b5;
    }
  }
`;