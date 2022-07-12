import React from 'react'
import styled from '@emotion/styled'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Player } from '../Player/types';
import { getStylizedRecord } from '../Player/utils/record';

interface PlayerCardProps {
  name: string;
  record: string;
}

const PlayerName = styled(Typography)`
  line-height: 0.6;
`;

const PlayerRecord = styled(Typography)`
  line-height: 0.6;
`;

const PlayerCard = (props: PlayerCardProps) => {
  return (
    <div>
      <PlayerName>{props.name}</PlayerName>
      <PlayerRecord variant="caption">{props.record}</PlayerRecord>
    </div>
  );
};

interface PairingProps {
  firstPlayer: Player | undefined;
  secondPlayer: Player | undefined;
}

const PairingHeaderContainer = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  justify-content: center;
`;

const PairingHeader = (props: PairingProps) => {
  if (props.firstPlayer && props.secondPlayer) {
    return (
      <PairingHeaderContainer>
        <PlayerCard name={props.firstPlayer.name} record={getStylizedRecord(props.firstPlayer.record)} />
        <Typography>vs</Typography>
        <PlayerCard name={props.secondPlayer.name} record={getStylizedRecord(props.secondPlayer.record)} />
      </PairingHeaderContainer>
    )
  }

  if (!props.firstPlayer && props.secondPlayer) {
    <PairingHeaderContainer>
      <PlayerCard name={props.secondPlayer.name} record={getStylizedRecord(props.secondPlayer.record)} />
    </PairingHeaderContainer>
  }

  if (props.firstPlayer && !props.secondPlayer) {
    <PairingHeaderContainer>
      <PlayerCard name={props.firstPlayer.name} record={getStylizedRecord(props.firstPlayer.record)} />
    </PairingHeaderContainer>
  }

  return null;
}

const PairingAccordion = (props: PairingProps) => {
  return (
    <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          expandIcon={<ExpandMoreIcon />}
        >
          <PairingHeader {...props} />
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
  )
}

export default PairingAccordion;