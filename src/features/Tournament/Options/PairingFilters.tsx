import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import type { MatchFilter } from '../Pairings/types';

interface PairingsFiltersProps {
  completedMatchFilter: MatchFilter;
  setCompletedMatchFilter: (matchFilter: MatchFilter) => void;
}

export const PairingFilters = (props: PairingsFiltersProps) => {
  return (
    <FormControl>
      <FormLabel htmlFor='pairing-filters'>Filters</FormLabel>
      <FormGroup id='pairing-filters'>
        <FormControlLabel
          control={
            <Checkbox
              checked={props.completedMatchFilter === 'completed'}
              onChange={e => {
                e.target.checked
                  ? props.setCompletedMatchFilter('completed')
                  : props.setCompletedMatchFilter(undefined);
              }}
            />
          }
          label='Completed matches'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={props.completedMatchFilter === 'incomplete'}
              onChange={e => {
                e.target.checked
                  ? props.setCompletedMatchFilter('incomplete')
                  : props.setCompletedMatchFilter(undefined);
              }}
            />
          }
          label='Incomplete matches'
        />
      </FormGroup>
    </FormControl>
  );
};