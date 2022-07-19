import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { RootState } from '../../../app/store';
import { enterCut, nextRound } from '../state/tournamentSlice';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import styled from '@emotion/styled';

const NextRoundButtonContainer = styled.div`
  display: flex;
  align-items: center;

  .MuiSvgIcon-root {
    height: 0.75em;
    padding-bottom: 2px;
  }
`;

export const NextRoundButton = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const allMatchesSubmitted = useSelector(
    (state: RootState) =>
      state.tournament.matchResults.length === state.tournament.pairings.length
  );
  const shouldEnterCut: boolean = useSelector(
    (state: RootState) =>
      !!state.tournament.topCut && state.tournament.viewState === 'standings'
  );
  const buttonText: string = useSelector(
    (state: RootState) => {
      if (state.tournament.round === state.tournament.maxRounds) {
        if (state.tournament.viewState === 'tournament' && state.tournament.topCut) {
          return 'Finish swiss';
        }

        if (state.tournament.viewState === 'top-cut' || (state.tournament.viewState === 'tournament' && !state.tournament.topCut)) {
          return 'Complete tournament';
        }
      }

      return 'Next round';
    }
  );

  if (shouldEnterCut) {
    return (
      <NextRoundButtonContainer>
        <Button aria-label='Enter top cut' onClick={() => dispatch(enterCut())}>
          Enter top cut
        </Button>
      </NextRoundButtonContainer>
    );
  }

  return (
    <NextRoundButtonContainer>
      <Button
        aria-label='Generate next round pairings'
        onClick={() => dispatch(nextRound())}
        disabled={!allMatchesSubmitted}
      >
        {buttonText}
      </Button>
      {!allMatchesSubmitted && (
        <Tooltip
          arrow
          title='All match results must be submitted before proceeding to the next round.'
        >
          <HelpOutlineOutlinedIcon />
        </Tooltip>
      )}
    </NextRoundButtonContainer>
  );
};