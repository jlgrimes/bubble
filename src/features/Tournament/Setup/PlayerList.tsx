import List from '@mui/material/List';
import { Player } from '../Player/types';
import Card from '@mui/material/Card';
import { PlayerListItem } from './PlayerListItem';

interface PlayerListProps {
  players: Player[];
  updatePlayerName: (playerId: string, newName: string) => void;
}

export const PlayerList = (props: PlayerListProps) => {
  return (
    <Card>
      <List>
        {props.players.map((player: Player, idx: number) => (
          <PlayerListItem
            player={player}
            idx={idx}
            updatePlayerName={props.updatePlayerName}
          />
        ))}
      </List>
    </Card>
  );
};
