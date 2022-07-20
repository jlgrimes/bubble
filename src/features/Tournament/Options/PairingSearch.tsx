import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import CancelIcon from '@mui/icons-material/Cancel';
import FilterListIcon from '@mui/icons-material/FilterList';

interface PairingSearchProps {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

export const PairingSearch = (props: PairingSearchProps) => {
  return (
    <Paper
      component='form'
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton sx={{ p: '10px' }} aria-label='search'>
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Search Player'
        inputProps={{ 'aria-label': 'search pairings' }}
        value={props.searchQuery}
        onChange={e => props.setSearchQuery(e.target.value)}
        endAdornment={
          props.searchQuery.length > 0 && (
            <IconButton
              sx={{ p: '10px' }}
              onClick={() => props.setSearchQuery('')}
              disableRipple
            >
              <CancelIcon fontSize='small' />
            </IconButton>
          )
        }
        fullWidth
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
      <IconButton sx={{ p: '10px' }} aria-label='directions'>
        <FilterListIcon />
      </IconButton>
    </Paper>
  );
};
