import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { autoWins } from '../state/tournamentSlice';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export const AutoWins = () => {
  const dispatch = useDispatch();

  return (
    <Button
      startIcon={<EmojiEventsIcon />}
      onClick={() => dispatch(autoWins())}
    >
      Auto wins
    </Button>
  );
};
