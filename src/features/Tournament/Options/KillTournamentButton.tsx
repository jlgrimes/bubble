import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { killTournament } from '../state/tournamentSlice';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export const KillTournamentButton = () => {
  const dispatch = useDispatch();

  return (
    <Button
      startIcon={<HighlightOffIcon />}
      onClick={() => dispatch(killTournament())}
    >
      Kill
    </Button>
  );
};
