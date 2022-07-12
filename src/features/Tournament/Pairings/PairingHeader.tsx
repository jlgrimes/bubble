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
  firstPlayer: Player | undefined;
  secondPlayer: Player | undefined;
}

export const PairingHeader = (props: PairingHeaderProps) => {
  if (props.firstPlayer && props.secondPlayer) {
    return (
      <PairingHeaderContainer>
        <PlayerCard
          name={props.firstPlayer.name}
          record={getStylizedRecord(props.firstPlayer.record)}
        />
        <Typography>vs</Typography>
        <PlayerCard
          name={props.secondPlayer.name}
          record={getStylizedRecord(props.secondPlayer.record)}
        />
      </PairingHeaderContainer>
    );
  }

  if (!props.firstPlayer && props.secondPlayer) {
    <PairingHeaderContainer>
      <PlayerCard
        name={props.secondPlayer.name}
        record={getStylizedRecord(props.secondPlayer.record)}
      />
    </PairingHeaderContainer>;
  }

  if (props.firstPlayer && !props.secondPlayer) {
    <PairingHeaderContainer>
      <PlayerCard
        name={props.firstPlayer.name}
        record={getStylizedRecord(props.firstPlayer.record)}
      />
    </PairingHeaderContainer>;
  }

  return null;
};
