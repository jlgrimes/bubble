import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { nextRound } from './state/tournamentSlice';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import styled from '@emotion/styled';

const NextRoundButtonContainer = styled.div`
  display: flex;
  align-items: center;

  .MuiSvgIcon-root  {
    height: 0.75em;
    padding-bottom: 2px;
  }
`;

const NextRoundButton = () => {
  const dispatch = useDispatch();
  const allMatchesSubmitted = useSelector(
    (state: RootState) =>
      state.tournament.matchResults.length === state.tournament.pairings.length
  );

  return (
    <NextRoundButtonContainer>
      <Button
        aria-label='Generate next round pairings'
        onClick={() => dispatch(nextRound())}
        disabled={!allMatchesSubmitted}
      >
        Next round
      </Button>
      {!allMatchesSubmitted && (
        <Tooltip arrow title="All match results must be submitted before proceeding to the next round.">
          <HelpOutlineOutlinedIcon />
        </Tooltip>
      )}
    </NextRoundButtonContainer>
  )
}

export const TournamentStateView = () => {
  return (
    <div>
      <NextRoundButton />
    </div>
  );
};
