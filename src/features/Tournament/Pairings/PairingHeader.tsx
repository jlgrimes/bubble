import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';

import type { Player } from '../Player/types';
import { convertMatchToPlayerMatch } from '../Player/utils/player';
import { getStylizedRecord } from '../Player/utils/record';
import { PlayerCard } from './PlayerCard';
import { PairingHeaderCard } from './PairingHeaderCard';
import type { Match } from './types';
import { ByeCard } from './ByeCard';
import Grid from '@mui/material/Grid';

const PairingHeaderContainer = styled(Grid)`
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
    <PairingHeaderContainer
      container
      aria-label={`${tableText} pairings`}
      {...props}
    >
      <Grid item xs={4}>
        <PlayerCard
          name={props.firstPlayer.name}
          record={getStylizedRecord(props.firstPlayer.record, props.firstPlayer.dropped)}
          matchResult={
            props.completedMatch
              ? convertMatchToPlayerMatch(props.firstPlayer, props.completedMatch)
                  .result
              : undefined
          }
          dropped={props.firstPlayer.dropped}
        />
      </Grid>
      <Grid xs={4}>
        <PairingHeaderCard>
          <Typography>{tableText}</Typography>
        </PairingHeaderCard>
      </Grid>
      <Grid xs={4}>
        {props.secondPlayer.id !== 'bye' ? (
          <PlayerCard
            name={props.secondPlayer.name}
            record={getStylizedRecord(props.secondPlayer.record, props.secondPlayer.dropped)}
            matchResult={
              props.completedMatch
                ? convertMatchToPlayerMatch(
                    props.secondPlayer,
                    props.completedMatch
                  ).result
                : undefined
            }
            dropped={props.secondPlayer.dropped}
          />
        ) : (
          <ByeCard />
        )}
      </Grid>
    </PairingHeaderContainer>
  );
};
