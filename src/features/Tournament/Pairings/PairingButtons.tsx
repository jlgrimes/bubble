import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { submitMatchResult } from '../state/tournamentSlice';
import type { MatchResult, Match } from './types';
import type { Player } from '../Player/types';
import { PairingRepairConfirmationModal } from './PairingRepairConfirmationModal';
import { ViewState } from '../state/ViewState';
import { RootState } from '../../../app/store';

interface PairingButtonProps {
  firstPlayer: Player;
  secondPlayer: Player;
  completedMatch?: Match;
}

export const PairingButtons = (props: PairingButtonProps) => {
  const dispatch = useDispatch();
  const [repairModalOpen, setRepairModalOpen] = React.useState(false);

  const playerIds: string[] = [props.firstPlayer.id, props.secondPlayer.id];

  const viewState: ViewState = useSelector(
    (state: RootState) => state.tournament.viewState
  );

  const handleClick = (result: MatchResult) => {
    dispatch(submitMatchResult({ playerIds, result }));
  };

  return (
    <div>
      <PairingRepairConfirmationModal
        open={repairModalOpen}
        setOpen={setRepairModalOpen}
        match={props.completedMatch!}
      />
      <ButtonGroup
        variant='contained'
        size='large'
        disabled={!!props.completedMatch}
      >
        <Button aria-label={`Mark win ${props.firstPlayer.name}`} onClick={() => handleClick('win')}>
          Win
        </Button>
        {viewState !== 'top-cut' && (
          <Button aria-label='Mark tie' onClick={() => handleClick('tie')}>
            Tie
          </Button>
        )}
        <Button aria-label={`Mark win ${props.secondPlayer.name}`} onClick={() => handleClick('loss')}>
          Win
        </Button>
      </ButtonGroup>
      <div>
        {
          viewState !== 'top-cut' && (
            <Button
              aria-label='Mark double game loss'
              onClick={() =>
                dispatch(submitMatchResult({ playerIds, result: 'double-loss' }))
              }
            >
              Double game loss
            </Button>
          )
        }
        {props.completedMatch && (
          <Button
            aria-label='Unsubmit match result'
            onClick={() => setRepairModalOpen(true)}
          >
            Unsubmit match result
          </Button>
        )}
      </div>
    </div>
  );
};
