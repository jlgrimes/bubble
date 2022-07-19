import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

interface PairingSearchProps {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

export const PairingSearch = (props: PairingSearchProps) => {
  return (
    <FormControl>
      <InputLabel htmlFor='component-outlined'>Search</InputLabel>
      <OutlinedInput
        id='component-outlined'
        value={props.searchQuery}
        onChange={e => props.setSearchQuery(e.target.value)}
        label='Search'
      />
    </FormControl>
  )
}