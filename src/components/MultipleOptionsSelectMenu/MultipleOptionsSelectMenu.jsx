import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};





export default function MultipleOptionsSelectMenu({ funcionarios,onFuncionariosSelecionadosChange  }) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    console.log(event)
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    onFuncionariosSelecionadosChange(value);
  };

  return (
    <div>
      <FormControl  sx={{ m: 1, width: '100%', borderRadius: '8px',border:'1px solid var(--White-Base-02, #E8E7E7);' }}>
        <InputLabel  id="demo-multiple-chip-label">Selecionar</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value.split(':')[0]} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {funcionarios.map((funcionario) => (
            <MenuItem
              key={funcionario.id}
              value={`${funcionario.userName}:${funcionario.id}`}
              style={getStyles(funcionario.userName, personName, theme)}
            >
              {funcionario.userName} 
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
