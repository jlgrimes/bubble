import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React from 'react';
import { Player } from './Player/types';
import { createPlayer } from './Player/utils/player';
import { useDispatch } from 'react-redux';
import { initializeTournament, loadPlayers } from './state/tournamentSlice';
import { ButtonWithDisabledTooltip } from '../../common/ButtonWithDisabledTooltip';

export const TournamentSetupView = () => {
  const [currentPlayerField, setCurrentPlayerField] =
    React.useState<string>('');
  const [players, setPlayers] = React.useState<Player[]>([]);
  const dispatch = useDispatch();

  return (
    <div>
      <ButtonWithDisabledTooltip
        onClick={() => {
          dispatch(loadPlayers(players));
        }}
        disabled={players.length <= 2}
        disabledTooltipText='Must have more than 2 players to start a tournament.'
      >
        Start tournament
      </ButtonWithDisabledTooltip>
      <TextField
        label='Player name'
        value={currentPlayerField}
        onChange={e => setCurrentPlayerField(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            setPlayers([...players, createPlayer(currentPlayerField)]);
            setCurrentPlayerField('');
          }
        }}
      />
      <div>
        {players.map((player: Player) => (
          <div>{player.name}</div>
        ))}
      </div>
    </div>
  );
};
