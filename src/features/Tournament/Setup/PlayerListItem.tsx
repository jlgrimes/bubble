import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Player } from '../Player/types';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import Input from '@mui/material/Input';
import { memo, useCallback, useMemo, useState } from 'react';
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
  const { setPlayers, players, player } = props;

  const [isHovering, setIsHovering] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [playerNameInput, setPlayerNameInput] = useState<string>(player.name);

  const commitPlayerEdit = useCallback(() => {
    setIsEditing(false);
    setPlayers(updatePlayerName(players, player.id, playerNameInput));
  }, [setPlayers, players, player.id, playerNameInput]);

  const commitPlayerDelete = useCallback(() => {
    setIsEditing(false);
    setPlayers(deletePlayer(players, player.id));
  }, [setPlayers, players, player.id]);

  const DeleteButton = memo(() => {
    return (
      <IconButton
        data-testid={`setup-player-${props.idx + 1}-delete-button`}
        onClick={() => commitPlayerDelete()}
      >
        <DeleteIcon />
      </IconButton>
    );
  });

  if (isEditing) {
    return (
      <ListItem
        data-testid={`setup-player-${props.idx + 1}-editing`}
        key={props.idx}
        disablePadding
        secondaryAction={
          <>
            <IconButton
              data-testid={`setup-player-${props.idx + 1}-save-edit-button`}
              onClick={() => commitPlayerEdit()}
            >
              <SaveIcon />
            </IconButton>
            <DeleteButton />
          </>
        }
      >
        <PlayerNameInput
          data-testid={`setup-player-${props.idx + 1}-edit-input`}
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
      data-testid={`setup-player-${props.idx + 1}`}
      key={props.idx}
      disablePadding
      secondaryAction={
        isHovering && (
          <>
            <IconButton
              data-testid={`setup-player-${props.idx + 1}-edit-button`}
              onClick={() => setIsEditing(true)}
            >
              <EditIcon />
            </IconButton>
            <DeleteButton />
          </>
        )
      }
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <ListItemButton
        data-testid={`setup-player-${props.idx + 1}-list-item-button`}
        disableRipple
        onClick={() => setIsEditing(true)}
      >
        <ListItemText>{player.name}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
