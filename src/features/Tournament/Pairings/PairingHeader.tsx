import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';

import type { Player } from '../Player/types';
import { getStylizedRecord } from '../Player/utils/record';
import { PlayerCard } from './PlayerCard';

const PairingHeaderContainer = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  justify-content: center;
  // Offset icon spacing
  padding-left: 24px;
`;

export interface PairingHeaderProps {
  firstPlayer: Player;
  secondPlayer: Player;
  table: number;
}

export const PairingHeader = (props: PairingHeaderProps) => {
  return (
    <PairingHeaderContainer>
      <PlayerCard
        name={props.firstPlayer.name}
        record={getStylizedRecord(props.firstPlayer.record)}
      />
      <Typography>Table {props.table}</Typography>
      <PlayerCard
        name={props.secondPlayer.name}
        record={getStylizedRecord(props.secondPlayer.record)}
      />
    </PairingHeaderContainer>
  );
};
