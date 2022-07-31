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

const PairingHeaderContainer = styled(Grid, {
  shouldForwardProp: prop => prop !== 'completedMatch',
})((props: PairingGridProps) => ({
  backgroundColor:
    props.completedMatch?.result === 'tie'
      ? '#ffeeba'
      : props.completedMatch?.result === 'double-loss'
      ? '#f5c6cb'
      : undefined,
}));

interface PairingGridProps {
  table: number;
  completedMatch?: Match;
}

export interface PairingHeaderProps extends PairingGridProps {
  firstPlayer: Player;
  secondPlayer: Player;
}

export const PairingHeader = (props: PairingHeaderProps) => {
  const { firstPlayer, secondPlayer, ...rest } = props;
  const tableText = `Table ${props.table}`;

  return (
    <PairingHeaderContainer
      container
      aria-label={`${tableText} pairings`}
      {...rest}
    >
      <Grid item xs={4}>
        <PlayerCard
          name={firstPlayer.name}
          record={getStylizedRecord(firstPlayer.record, firstPlayer.dropped)}
          matchResult={
            props.completedMatch
              ? convertMatchToPlayerMatch(firstPlayer, props.completedMatch)
                  .result
              : undefined
          }
          dropped={firstPlayer.dropped}
        />
      </Grid>
      <Grid item xs={4}>
        <PairingHeaderCard>
          <Typography>{tableText}</Typography>
        </PairingHeaderCard>
      </Grid>
      <Grid item xs={4}>
        {secondPlayer.id !== 'bye' ? (
          <PlayerCard
            name={secondPlayer.name}
            record={getStylizedRecord(
              secondPlayer.record,
              secondPlayer.dropped
            )}
            matchResult={
              props.completedMatch
                ? convertMatchToPlayerMatch(secondPlayer, props.completedMatch)
                    .result
                : undefined
            }
            dropped={secondPlayer.dropped}
          />
        ) : (
          <ByeCard />
        )}
      </Grid>
    </PairingHeaderContainer>
  );
};
