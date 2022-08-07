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
}

const PlayerNameInput = styled(Input)`
  margin: 8px 16px;
`;

export const PlayerListItem = (props: PlayerListItemProps) => {
  const [isHovering, setIsHovering] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  if (isEditing) {
    return (
      <ListItem
        key={props.idx}
        disablePadding
        secondaryAction={
          <IconButton onClick={() => setIsEditing(false)}>
            <SaveIcon />
          </IconButton>
        }
      >
        <PlayerNameInput defaultValue={props.player.name} autoFocus />
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
          <PlayerListItem player={player} idx={idx} />
        ))}
      </List>
    </Card>
  );
};
