import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { abandonTournament } from '../state/tournamentSlice';
import { ButtonWithConfirmationModal } from '../../../common/ButtonWithConfirmationModal';

export const AbandonTournamentButton = () => {
  const dispatch = useDispatch();

  return (
    <ButtonWithConfirmationModal
      startIcon={<LogoutIcon />}
      modalTitle="Are you sure you want to abandon the tournament?"
      modalContent="Abandoning the tournament will permanently lose all tournament data saved to this point."
      onClick={() => dispatch(abandonTournament())}
    >
      Abandon
    </ButtonWithConfirmationModal>
  );
};
