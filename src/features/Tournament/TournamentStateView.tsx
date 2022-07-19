import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from "react-router-dom";
import { RootState } from '../../app/store';
import { autoWins, enterCut, nextRound } from './state/tournamentSlice';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const ButtonRowContainer = styled.div`
  display: flex;
  align-items: center;

  .MuiSvgIcon-root {
    height: 0.75em;
    padding-bottom: 2px;
  }
`;

const NextRoundButton = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const allMatchesSubmitted = useSelector(
    (state: RootState) =>
      state.tournament.matchResults.length === state.tournament.pairings.length
  );
  const roundText = useSelector(
    (state: RootState) =>
      `Round ${state.tournament.round} of ${state.tournament.maxRounds}`
  );

  return (
    <ButtonRowContainer>
      <Typography>{roundText}</Typography>
      <Button
        aria-label='Generate next round pairings'
        onClick={() => dispatch(nextRound())}
        disabled={!allMatchesSubmitted}
      >
        Next round
      </Button>
      {searchParams.get('dev') && (
        <Button onClick={() => dispatch(autoWins())}>Auto wins</Button>
      )}
      {!allMatchesSubmitted && (
        <Tooltip
          arrow
          title='All match results must be submitted before proceeding to the next round.'
        >
          <HelpOutlineOutlinedIcon />
        </Tooltip>
      )}
    </ButtonRowContainer>
  );
};

const StandingsButtons = () => {
  const dispatch = useDispatch();

  return (
    <ButtonRowContainer>
      <Button onClick={() => dispatch(enterCut())}>
        Enter top cut
      </Button>
    </ButtonRowContainer>
  )
}

export const TournamentStateView = () => {
  const shouldRenderTournamentButtons: boolean = useSelector((state: RootState) => state.tournament.viewState === 'tournament' || state.tournament.viewState === 'top-cut');
  const shouldEnterCut: boolean = useSelector((state: RootState) => !!state.tournament.topCut && state.tournament.viewState === 'standings');

  return (
    <div>
      {shouldRenderTournamentButtons && <NextRoundButton />}
      {shouldEnterCut && <StandingsButtons />}
    </div>
  );
};
