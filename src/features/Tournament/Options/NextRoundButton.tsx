import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { RootState } from '../../../app/store';
import { abandonTournament, enterCut, nextRound } from '../state/tournamentSlice';
import { ButtonWithDisabledTooltip } from '../../../common/ButtonWithDisabledTooltip';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React from 'react';
import { ViewState } from '../state/ViewState';
import { ButtonWithConfirmationModal } from '../../../common/ButtonWithConfirmationModal';
import ReplayIcon from '@mui/icons-material/Replay';

export const NextRoundButton = () => {
  const [loading, setLoading] = React.useState<ViewState | boolean>(false);
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
  const tournamentIsOver: boolean = useSelector(
    (state: RootState) =>
      state.tournament.viewState === 'final-standings' ||
      (state.tournament.viewState === 'standings' && !state.tournament.topCut)
  );
  const buttonText: string = useSelector((state: RootState) => {
    if (state.tournament.round === state.tournament.maxRounds) {
      if (
        state.tournament.viewState === 'tournament' &&
        state.tournament.topCut
      ) {
        return 'Finish swiss';
      }

      if (
        state.tournament.viewState === 'top-cut' ||
        (state.tournament.viewState === 'tournament' &&
          !state.tournament.topCut)
      ) {
        return 'Complete';
      }
    }

    return 'Next round';
  });
  const round = useSelector((state: RootState) => state.tournament.round);

  React.useEffect(() => {
    setLoading(false);
  }, [round]);

  React.useEffect(() => {
    if (loading === 'top-cut') {
      dispatch(enterCut());
    } else if (loading === 'tournament') {
      dispatch(nextRound());
    }
  }, [loading]);

  if (tournamentIsOver) {
    return (
      <ButtonWithConfirmationModal
        onClick={() => dispatch(abandonTournament())}
        modalTitle='Are you sure you want to start a new tournament?'
        modalContent='You will not be able to return to this tournament. Make sure to print standings to have record of the tournament!'
        startIcon={<ReplayIcon />}
      >
        New tournament
      </ButtonWithConfirmationModal>
    )
  }

  if (shouldEnterCut) {
    return (
      <Button
        aria-label='Enter top cut'
        onClick={() => {
          setLoading('top-cut');
        }}
      >
        Enter top cut
      </Button>
    );
  }

  return (
    <ButtonWithDisabledTooltip
      aria-label='Generate next round pairings'
      onClick={() => {
        setLoading('tournament');
      }}
      disabled={!allMatchesSubmitted}
      disabledTooltipText='All match results must be submitted before proceeding to the next round.'
      startIcon={<ArrowForwardIosIcon />}
      loading={!!loading}
    >
      {buttonText}
    </ButtonWithDisabledTooltip>
  );
};
