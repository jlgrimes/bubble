import { useDispatch, useSelector } from 'react-redux';
import Button, { ButtonProps } from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import {
  dropPlayer,
  submitMatchResult,
  unsubmitMatchResult,
} from '../state/tournamentSlice';
import type { MatchResult, Match } from './types';
import type { Player } from '../Player/types';
import { ViewState } from '../state/ViewState';
import { RootState } from '../../../app/store';
import Stack from '@mui/material/Stack';
import { ButtonWithConfirmationModal } from '../../../common/ButtonWithConfirmationModal';
import { markButtonProps } from '../../../common/props';

interface DropPlayerButtonProps {
  player: Player;
  dispatchDropPlayer: () => void;
}

const DropPlayerButton = (props: DropPlayerButtonProps) => (
  <ButtonWithConfirmationModal
    {...markButtonProps}
    aria-label={`Drop ${props.player.name}`}
    onClick={props.dispatchDropPlayer}
    color='error'
    disabled={props.player.dropped}
    modalTitle={`Are you sure you want to drop ${props.player.name}?`}
    modalContent={`Once ${props.player.name} is dropped, they will not be able to be readded to the tournament.`}
  >
    Drop
  </ButtonWithConfirmationModal>
);

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

  const eitherPlayerDropped: boolean =
    !!props.firstPlayer.dropped || !!props.secondPlayer.dropped;

  return (
    <div>
      <Stack>
        <ButtonGroup {...markButtonProps}>
          <Button
            aria-label={`Mark win ${props.firstPlayer.name}`}
            disabled={!!props.completedMatch}
            onClick={() => handleClick('win')}
          >
            Win
          </Button>
          {viewState !== 'top-cut' && (
            <Button
              aria-label='Mark tie'
              disabled={!!props.completedMatch}
              onClick={() => handleClick('tie')}
            >
              Tie
            </Button>
          )}
          <Button
            aria-label={`Mark win ${props.secondPlayer.name}`}
            disabled={!!props.completedMatch}
            onClick={() => handleClick('loss')}
          >
            Win
          </Button>
        </ButtonGroup>
        <ButtonGroup {...markButtonProps}>
          <DropPlayerButton
            player={props.firstPlayer}
            dispatchDropPlayer={() =>
              dispatch(dropPlayer(props.firstPlayer.id))
            }
          />
          {viewState !== 'top-cut' && (
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
          )}
          <DropPlayerButton
            player={props.secondPlayer}
            dispatchDropPlayer={() =>
              dispatch(dropPlayer(props.secondPlayer.id))
            }
          />
        </ButtonGroup>
      </Stack>
      <div>
        {props.completedMatch && !eitherPlayerDropped && (
          <ButtonWithConfirmationModal
            {...markButtonProps}
            aria-label='Unsubmit match result'
            modalTitle='Are you sure you want to unsubmit?'
            modalContent='Repairing should only be done if match results are incorrectly
            submitted.'
            onClick={() => dispatch(unsubmitMatchResult(props.completedMatch!))}
          >
            Unsubmit match result
          </ButtonWithConfirmationModal>
        )}
      </div>
    </div>
  );
};
