import React from 'react';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { submitMatchResult } from '../state/tournamentSlice';
import type { MatchResult, Match } from './types';
import type { Player } from '../Player/types';
import { PairingRepairConfirmationModal } from './PairingRepairConfirmationModal';

interface PairingButtonProps {
  firstPlayer: Player;
  secondPlayer: Player;
  completedMatch?: Match;
}

export const PairingButtons = (props: PairingButtonProps) => {
  const dispatch = useDispatch();
  const [repairModalOpen, setRepairModalOpen] = React.useState(false);

  const playerIds: string[] = [props.firstPlayer.id, props.secondPlayer.id];

  const handleClick = (result: MatchResult) => {
    dispatch(submitMatchResult({ playerIds, result }))
  };

  return (
    <div>
      <PairingRepairConfirmationModal open={repairModalOpen} setOpen={setRepairModalOpen} match={props.completedMatch!} />
      <ButtonGroup variant="contained" size="large" disabled={!!props.completedMatch}>
        <Button onClick={() => handleClick('win')}>Win</Button>
        <Button onClick={() => handleClick('tie')}>Tie</Button>
        <Button onClick={() => handleClick('loss')}>Win</Button>
      </ButtonGroup>
      <div>
        <Button>Double game loss</Button>
        {props.completedMatch && <Button onClick={() => setRepairModalOpen(true)}>Unsubmit match result</Button>}
      </div>
    </div>
  )
}