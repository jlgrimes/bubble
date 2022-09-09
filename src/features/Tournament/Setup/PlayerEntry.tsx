import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Input } from '../../../common/Input';
import IconButton from '@mui/material/IconButton';
import { PlayerList } from '../Setup/PlayerList';
import Stack from '@mui/material/Stack';
import { Player } from '../Player/types';
import { createPlayer } from '../Player/utils/player';

interface PlayerEntryProps {
  players: Player[];
  setPlayers: (players: Player[]) => void;
}

export const PlayerEntry = (props: PlayerEntryProps) => {
  const [currentPlayerField, setCurrentPlayerField] =
    React.useState<string>('');

  const submitInput = () => {
    props.setPlayers([...props.players, createPlayer(currentPlayerField)]);
    setCurrentPlayerField('');
  };

  const updatePlayers = (players: Player[]) => {
    props.setPlayers(players);
  };

  return (
    <Stack spacing={2}>
      <Input
        id='add-player-input'
        fullWidth
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
      <PlayerList players={props.players} setPlayers={updatePlayers} />
    </Stack>
  );
};
