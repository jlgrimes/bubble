import List from '@mui/material/List';
import { Player } from '../Player/types';
import Card from '@mui/material/Card';
import { PlayerListItem } from './PlayerListItem';

interface PlayerListProps {
  players: Player[];
  setPlayers: (players: Player[]) => void;
}

export const PlayerList = (props: PlayerListProps) => {
  return (
    <Card>
      <List>
        {props.players.map((player: Player, idx: number) => (
          <PlayerListItem
            player={player}
            idx={idx}
            players={props.players}
            setPlayers={props.setPlayers}
          />
        ))}
      </List>
    </Card>
  );
};
