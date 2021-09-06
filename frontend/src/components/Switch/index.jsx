import React, { useState } from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import MSwitch from '@material-ui/core/Switch';

const Switch = ({ value }) => {
  const initialState = (value === "Devolvido" || value === "Devolvido com atraso") ? true : false;
  const [isChecked, setIsChecked] = useState(initialState);

  return (
    <FormControlLabel
      control={<MSwitch checked={isChecked} onChange={() => setIsChecked(true)} name="checkedA" color="primary" />}
      label="Marcar como devolvido"
    />
  )
}

export default Switch;