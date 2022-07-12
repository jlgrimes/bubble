import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';

const PlayerName = styled(Typography)`
  line-height: 0.6;
`;

const PlayerRecord = styled(Typography)`
  line-height: 0.6;
`;

interface PlayerCardProps {
  name: string;
  record: string;
}

export const PlayerCard = (props: PlayerCardProps) => {
  return (
    <div>
      <PlayerName>{props.name}</PlayerName>
      <PlayerRecord variant='caption'>{props.record}</PlayerRecord>
    </div>
  );
};
