import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';

import type { Player } from '../Player/types';
import { convertMatchToPlayerMatch } from '../Player/utils/player';
import { getStylizedRecord } from '../Player/utils/record';
import { PlayerCard } from './PlayerCard';
import { PairingHeaderCard } from './PairingHeaderCard';
import type { Match } from './types';
import { ByeCard } from './ByeCard';

const PairingHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: stretch;
  background-color: ${(props: PairingHeaderProps) =>
    props.completedMatch?.result === 'tie'
      ? '#ffeeba'
      : props.completedMatch?.result === 'double-loss'
      ? '#f5c6cb'
      : undefined};
`;

export interface PairingHeaderProps {
  firstPlayer: Player;
  secondPlayer: Player;
  table: number;
  completedMatch?: Match;
}

export const PairingHeader = (props: PairingHeaderProps) => {
  const tableText = `Table ${props.table}`;

  return (
    <PairingHeaderContainer aria-label={`${tableText} pairings`} {...props}>
      <PlayerCard
        name={props.firstPlayer.name}
        record={getStylizedRecord(props.firstPlayer.record)}
        matchResult={
          props.completedMatch
            ? convertMatchToPlayerMatch(props.firstPlayer, props.completedMatch)
                .result
            : undefined
        }
      />
      <PairingHeaderCard>
        <Typography>{tableText}</Typography>
      </PairingHeaderCard>
      {
        props.secondPlayer.id !== 'bye' ? (
          <PlayerCard
            name={props.secondPlayer.name}
            record={getStylizedRecord(props.secondPlayer.record)}
            matchResult={
              props.completedMatch
                ? convertMatchToPlayerMatch(
                    props.secondPlayer,
                    props.completedMatch
                  ).result
                : undefined
            }
          />
        ) : (
          <ByeCard />
        )
      }
    </PairingHeaderContainer>
  );
};
