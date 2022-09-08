import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Player } from '../Player/types';
import Card from '@mui/material/Card';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Input from '@mui/material/Input';
import React from 'react';
import styled from '@emotion/styled';

interface PlayerListProps {
  players: Player[];
  updatePlayerName: (playerId: string, newName: string) => void
}

const PlayerListCardContent = styled(Card)`
  padding: 0;
`;

const PrettyIcon = styled.div`
  opacity: 0.54;
`;

interface PlayerListItemProps {
  player: Player;
  idx: number;
  updatePlayerName: (playerId: string, newName: string) => void
}

const PlayerNameInput = styled(Input)`
  margin: 8px 16px;
`;

export const PlayerListItem = (props: PlayerListItemProps) => {
  const [isHovering, setIsHovering] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [playerNameInput, setPlayerNameInput] = React.useState<string>(props.player.name);

  const commitPlayerEdit = () => {
    setIsEditing(false);
    props.updatePlayerName(props.player.id, playerNameInput);
  };

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
        <PlayerNameInput value={playerNameInput} onChange={(e) => setPlayerNameInput(e.target.value)} autoFocus />
      </ListItem>
    );
  }

  return (
    <ListItem
      key={props.idx}
      disablePadding
      secondaryAction={
        isHovering && (
          <IconButton onClick={() => setIsEditing(true)}>
            <EditIcon />
          </IconButton>
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

export const PlayerList = (props: PlayerListProps) => {
  return (
    <Card>
      <List>
        {props.players.map((player: Player, idx: number) => (
          <PlayerListItem player={player} idx={idx} updatePlayerName={props.updatePlayerName} />
        ))}
      </List>
    </Card>
  );
};
