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

export const PairingCompleteFilters = (props: PairingsFiltersProps) => {
  return (
    <FormControl>
      <FormLabel htmlFor='pairing-filters'>Only show matches</FormLabel>
      <FormGroup id='pairing-filters'>
        <FormControlLabel
          control={
            <Checkbox
              checked={props.completedMatchFilter === 'completed'}
              onChange={e => {
                e.target.checked
                  ? props.setCompletedMatchFilter('completed')
                  : props.setCompletedMatchFilter(null);
              }}
            />
          }
          label='Completed'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={props.completedMatchFilter === 'incomplete'}
              onChange={e => {
                e.target.checked
                  ? props.setCompletedMatchFilter('incomplete')
                  : props.setCompletedMatchFilter(null);
              }}
            />
          }
          label='Incomplete'
        />
      </FormGroup>
    </FormControl>
  );
};