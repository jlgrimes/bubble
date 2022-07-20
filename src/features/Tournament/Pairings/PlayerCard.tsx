import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import { PairingHeaderCard } from './PairingHeaderCard';
import { MatchResult } from './types';

const PlayerName = styled(Typography)`
  line-height: 0.6;
`;

const PlayerRecord = styled(Typography)`
  line-height: 0.6;
`;

interface PlayerCardProps {
  name: string;
  record: string;
  matchResult?: MatchResult;
}

export const PlayerCardContainer = styled(PairingHeaderCard)`
  background-color: ${(props: PlayerCardProps) => props.matchResult === 'win' ? '#c3e6cb' : null};
  opacity: ${(props: PlayerCardProps) => props.matchResult === 'loss' ? 0.5 : 1};
  width: 100%;
  text-align: center;
  align-items: center;
`;

export const PlayerCard = (props: PlayerCardProps) => {
  return (
    <PlayerCardContainer {...props} aria-label={props.name}>
      <PlayerName>{props.name}</PlayerName>
      <PlayerRecord variant='caption'>{props.record}</PlayerRecord>
    </PlayerCardContainer>
  );
};
