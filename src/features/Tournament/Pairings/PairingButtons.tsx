import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { dropPlayer, submitMatchResult, unsubmitMatchResult } from '../state/tournamentSlice';
import type { MatchResult, Match } from './types';
import type { Player } from '../Player/types';
import { ViewState } from '../state/ViewState';
import { RootState } from '../../../app/store';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { ButtonWithConfirmationModal } from '../../../common/ButtonWithConfirmationModal';

interface PairingButtonProps {
  firstPlayer: Player;
  secondPlayer: Player;
  completedMatch?: Match;
}

export const PairingButtons = (props: PairingButtonProps) => {
  const dispatch = useDispatch();

  const playerIds: string[] = [props.firstPlayer.id, props.secondPlayer.id];

  const viewState: ViewState = useSelector(
    (state: RootState) => state.tournament.viewState
  );

  const handleClick = (result: MatchResult) => {
    dispatch(submitMatchResult({ playerIds, result }));
  };

  const eitherPlayerDropped: boolean = !!props.firstPlayer.dropped || !!props.secondPlayer.dropped;

  return (
    <div>
      <Grid container>
        <Grid item xs={4}>
          <Stack>
            <Button
              aria-label={`Mark win ${props.firstPlayer.name}`}
              disabled={!!props.completedMatch}
              onClick={() => handleClick('win')}
            >
              Win
            </Button>
            <Button
              aria-label={`Drop ${props.firstPlayer.name}`}
              onClick={() => dispatch(dropPlayer(props.firstPlayer.id))}
              color='error'
              disabled={props.firstPlayer.dropped}
            >
              Drop
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          {viewState !== 'top-cut' && (
            <Stack>
              <Button
                aria-label='Mark tie'
                disabled={!!props.completedMatch}
                onClick={() => handleClick('tie')}
              >
                Tie
              </Button>
              <Button
                color='error'
                aria-label='Mark double game loss'
                disabled={!!props.completedMatch}
                onClick={() =>
                  dispatch(
                    submitMatchResult({ playerIds, result: 'double-loss' })
                  )
                }
              >
                Double loss
              </Button>
            </Stack>
          )}
        </Grid>
        <Grid item xs={4}>
          <Stack>
            <Button
              aria-label={`Mark win ${props.secondPlayer.name}`}
              disabled={!!props.completedMatch}
              onClick={() => handleClick('loss')}
            >
              Win
            </Button>
            <Button
              aria-label={`Drop ${props.secondPlayer.name}`}
              onClick={() => dispatch(dropPlayer(props.secondPlayer.id))}
              color='error'
              disabled={props.secondPlayer.dropped}
            >
              Drop
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <div>
        {props.completedMatch && !eitherPlayerDropped && (
          <ButtonWithConfirmationModal
            aria-label='Unsubmit match result'
            modalTitle='Are you sure you want to unsubmit?'
            modalContent='Repairing should only be done if match results are incorrectly
            submitted.'
            onClick={() => dispatch((unsubmitMatchResult(props.completedMatch!)))}
          >
            Unsubmit match result
          </ButtonWithConfirmationModal>
        )}
      </div>
    </div>
  );
};
