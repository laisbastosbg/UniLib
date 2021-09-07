import React from 'react';

import Select from 'components/Select/Select';

import MenuItem from '@material-ui/core/MenuItem';

const SelectProfile = ({
  profile,
  setProfile
}) => {
  return (
    <Select
      label="Perfil"
      size="small"
      value={profile}
      onChange={(e) => setProfile(e.target.value)}
    >
      <MenuItem value={"administrador"}>Administrador</MenuItem>
      <MenuItem value={"bibliotecario"}>Bibliotecário</MenuItem>
    </Select>

  );
}

export default SelectProfile;