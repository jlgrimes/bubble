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
import { Input } from '../../../common/Input';

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
    <Input
      placeholder='Search Player'
      inputProps={{ 'aria-label': 'search pairings' }}
      value={props.searchQuery}
      setValue={props.setSearchQuery}
      startIcon={<SearchIcon />}
      endIcons={
        <>
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
        </>
      }
    />
  );
};
