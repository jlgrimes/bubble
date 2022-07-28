import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import { Player } from './Player/types';
import { createPlayer } from './Player/utils/player';
import { useDispatch } from 'react-redux';
import { initializeTournament, loadPlayers } from './state/tournamentSlice';
import { ButtonWithDisabledTooltip } from '../../common/ButtonWithDisabledTooltip';
import { Input } from '../../common/Input';
import { PersonAdd } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export const TournamentSetupView = () => {
  const [currentPlayerField, setCurrentPlayerField] =
    React.useState<string>('');
  const [players, setPlayers] = React.useState<Player[]>([]);
  const dispatch = useDispatch();

  const submitInput = () => {
    setPlayers([...players, createPlayer(currentPlayerField)]);
    setCurrentPlayerField('');
  };

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
      <Input
        id='add-player-input'
        endAdornment={
          <IconButton
            disabled={currentPlayerField === ''}
            onClick={() => submitInput()}
          >
            <AddIcon />
          </IconButton>
        }
        label='Add player'
        placeholder='Player name'
        value={currentPlayerField}
        setValue={setCurrentPlayerField}
        onKeyDown={e => {
          if (e.key === 'Enter' && currentPlayerField !== '') {
            submitInput();
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
