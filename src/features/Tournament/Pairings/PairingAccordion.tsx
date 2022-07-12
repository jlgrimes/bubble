import React from 'react'
import styled from '@emotion/styled'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Pairing } from './types';
import { Player } from '../Player/types';

const PairingHeader = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  justify-content: center;
`;

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
  firstPlayer: Player;
  secondPlayer: Player;
}

const PairingAccordion = (props: PairingProps) => {
  return (
    <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          expandIcon={<ExpandMoreIcon />}
        >
          <PairingHeader>
            <PlayerCard name="Jared Grimes" record='1-0-1' />
            <Typography>vs</Typography>
            <PlayerCard name="Kenny Packala" record='1-0-1' />
          </PairingHeader>
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