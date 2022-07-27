import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Player } from '../Player/types';
import { getStylizedRecord } from '../Player/utils/record';

export const PrintablePairings = () => {
  const { pairings, players, round } = useSelector(
    (state: RootState) => state.tournament
  );

  return (
    <>
      <Typography variant="h4">Round {round}</Typography>

      {pairings.map((pairing: string[], idx: number) => {
        const firstPlayer = players.find(
          (player: Player) => player.id === pairing[0]
        );
        const secondPlayer = players.find(
          (player: Player) => player.id === pairing[1]
        );

        return (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>Table {idx}</div>
            <div>{`${firstPlayer?.name} ${getStylizedRecord(
              firstPlayer!.record
            )}`}</div>
            <div>vs</div>
            <div>{`${secondPlayer?.name} ${getStylizedRecord(
              secondPlayer!.record
            )}`}</div>
          </div>
        );
      })}
    </>
  );
};
