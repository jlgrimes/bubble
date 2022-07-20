import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { autoWins } from '../state/tournamentSlice';

export const AutoWins = () => {
  const dispatch = useDispatch();

  return (
    <Button onClick={() => dispatch(autoWins())}>Auto wins</Button>
  )
}