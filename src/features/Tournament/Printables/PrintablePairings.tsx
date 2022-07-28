import React from 'react';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Player } from '../Player/types';
import { getStylizedRecord } from '../Player/utils/record';
import { getRoundText } from '../Options/utils/round';

export const PrintablePairings = () => {
  const { pairings, players, round } = useSelector(
    (state: RootState) => state.tournament
  );
  const roundText = useSelector(getRoundText);

  React.useEffect(() => {
    window.print();
  }, []);

  return (
    <>
      <Typography variant="h4">{roundText}</Typography>

      {pairings.map((pairing: string[], idx: number) => {
        const firstPlayer = players.find(
          (player: Player) => player.id === pairing[0]
        );
        const secondPlayer = players.find(
          (player: Player) => player.id === pairing[1]
        );

        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            <div>Table {idx + 1}</div>
            <div>{`${firstPlayer?.name} ${getStylizedRecord(
              firstPlayer!.record
            )}`}</div>
            <div>vs</div>
            <div>{`${secondPlayer?.name} ${secondPlayer?.id !== 'bye' ? getStylizedRecord(
              secondPlayer!.record
            ) : ''}`}</div>
          </div>
        );
      })}
    </>
  );
};
