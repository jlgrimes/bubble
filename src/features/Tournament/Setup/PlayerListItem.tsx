import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Player } from '../Player/types';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import Input from '@mui/material/Input';
import React from 'react';
import styled from '@emotion/styled';
import { deletePlayer, updatePlayerName } from './utils/playerMap';

const PlayerNameInput = styled(Input)`
  margin: 8px 16px;
`;

interface PlayerListItemProps {
  player: Player;
  idx: number;
  players: Player[];
  setPlayers: (players: Player[]) => void;
}

export const PlayerListItem = (props: PlayerListItemProps) => {
  const [isHovering, setIsHovering] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [playerNameInput, setPlayerNameInput] = React.useState<string>(
    props.player.name
  );

  const commitPlayerEdit = () => {
    setIsEditing(false);
    props.setPlayers(updatePlayerName(props.players, props.player.id, playerNameInput))
  };

  const commitPlayerDelete = () => {
    props.setPlayers(deletePlayer(props.players, props.player.id))
  }

  if (isEditing) {
    return (
      <ListItem
        key={props.idx}
        disablePadding
        secondaryAction={
          <IconButton onClick={() => commitPlayerEdit()}>
            <SaveIcon />
          </IconButton>
        }
      >
        <PlayerNameInput
          value={playerNameInput}
          onChange={e => setPlayerNameInput(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              commitPlayerEdit();
            }
          }}
          autoFocus
        />
      </ListItem>
    );
  }

  return (
    <ListItem
      key={props.idx}
      disablePadding
      secondaryAction={
        isHovering && (
          <div>
            <IconButton onClick={() => setIsEditing(true)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => commitPlayerDelete()}>
              <DeleteIcon />
            </IconButton>
          </div>
        )
      }
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <ListItemButton disableRipple onClick={() => setIsEditing(true)}>
        <ListItemText>{props.player.name}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};