import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import FilterListIcon from '@mui/icons-material/FilterList';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import { MatchFilter } from '../Pairings/types';
import { PairingCompleteFilters } from './PairingCompleteFilters';
import styled from '@emotion/styled';

interface PairingSearchProps {
  completedMatchFilter: MatchFilter;
  setCompletedMatchFilter: (matchFilter: MatchFilter) => void;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

const MenuContainer = styled.div`
  padding: 8px 12px;
`;

export const PairingFilter = (props: PairingSearchProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

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
      <IconButton
        id='filter-button'
        sx={{ p: '10px' }}
        aria-controls={open ? 'filters' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        {props.completedMatchFilter ? (
          <Badge badgeContent={1} color='primary'>
            <FilterListIcon />
          </Badge>
        ) : (
          <FilterListIcon />
        )}
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'filter-button',
        }}
      >
        <MenuContainer>
          <PairingCompleteFilters
            completedMatchFilter={props.completedMatchFilter}
            setCompletedMatchFilter={props.setCompletedMatchFilter}
          />
        </MenuContainer>
      </Menu>
    </Paper>
  );
};
