import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React from 'react';
import { Player } from './Player/types';
import { createPlayer } from './Player/utils/player';
import { useDispatch } from 'react-redux';
import { initializeTournament, loadPlayers } from './state/tournamentSlice';

export const TournamentSetupView = () => {
  const [currentPlayerField, setCurrentPlayerField] =
    React.useState<string>('');
  const [players, setPlayers] = React.useState<Player[]>([]);
  const dispatch = useDispatch();

  return (
    <div>
      <Button onClick={() => {
        dispatch(loadPlayers(players));
      }}>Start tournament</Button>
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
          <div>
            {player.name}
          </div>
        ))}
      </div>
    </div>
  );
};
