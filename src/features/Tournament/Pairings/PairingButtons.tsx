import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { submitMatchResult } from '../state/tournamentSlice';
import type { MatchResult } from './types';
import type { Player } from '../Player/types';

interface PairingButtonProps {
  firstPlayer: Player;
  secondPlayer: Player;
}

export const PairingButtons = (props: PairingButtonProps) => {
  const dispatch = useDispatch();
  const playerIds: number[] = [props.firstPlayer.id, props.secondPlayer.id];

  const handleClick = (result: MatchResult) => {
    dispatch(submitMatchResult({ playerIds, result }))
  };

  return (
    <ButtonGroup variant="contained" size="large">
      <Button onClick={() => handleClick('win')}>Win</Button>
      <Button onClick={() => handleClick('tie')}>Tie</Button>
      <Button onClick={() => handleClick('loss')}>Win</Button>
    </ButtonGroup>
  )
}