import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import { PairingHeaderCard } from './PairingHeaderCard';
import { MatchResult } from './types';

const PlayerName = styled(Typography)``;

const PlayerRecord = styled(Typography)`
`;

interface PlayerCardProps {
  name: string;
  record: string;
  matchResult?: MatchResult;
  dropped?: boolean;
}

export const PlayerCardContainer = styled.div`
  padding: 12px 0;
  background-color: ${(props: PlayerCardProps) =>
    props.matchResult === 'win' ? '#c3e6cb' : null};
  opacity: ${(props: PlayerCardProps) =>
    props.matchResult === 'loss' ? 0.5 : 1};
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const PlayerCard = (props: PlayerCardProps) => {
  return (
    <PairingHeaderCard>
      <PlayerCardContainer {...props} aria-label={props.name}>
        <PlayerName>{props.name}</PlayerName>
        <PlayerRecord variant='caption'>{props.record}</PlayerRecord>
      </PlayerCardContainer>
    </PairingHeaderCard>
  );
};
