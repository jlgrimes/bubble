import React from 'react';
import Accordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@emotion/styled';

import { PairingHeaderProps, PairingHeader } from './PairingHeader';
import { PairingButtons } from './PairingButtons';
import { Match } from './types';

interface PairingAccordionProps extends PairingHeaderProps {
  /**
   * The completed match if the match was already reported.
   */
  completedMatch?: Match;
  /**
   * If the accordion is expanded. Controlled by if any other accordion is expanded.
   */
  expanded: boolean;
  /**
   * handle change when the accordion
   */
  handleChange: Function;
}

const AccordionSummary = styled(MuiAccordionSummary)`
  min-height: 0;
  padding: 0;
  &.Mui-expanded {
    min-height: 0;
  }

  .MuiAccordionSummary-content,
  .MuiAccordionSummary-content.Mui-expanded {
    margin: 0;
  }
`;

const AccordionDetails = styled(MuiAccordionDetails)`
  padding: 0;
`;

const PairingAccordion = (props: PairingAccordionProps) => {
  const { expanded, handleChange, ...rest } = props;
  const [renderAccordionDetails, setRenderAccordionDetails] = React.useState<boolean>(false);
  const [accordionExpanded, setAccordionExpanded] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (expanded === false) {
      setAccordionExpanded(false);
      const timer = setTimeout(() => {
        setRenderAccordionDetails(false);
      }, 300);
      return () => clearTimeout(timer)
    } else {
      setRenderAccordionDetails(true);
      setAccordionExpanded(true);
    }
  }, [expanded]);

  const pairingIsBye: boolean = props.secondPlayer.id === 'bye';

  return (
    <Accordion
      expanded={accordionExpanded}
      onChange={!pairingIsBye && handleChange()}
      classes={{ root: 'pairing-accordion' }}
    >
      <AccordionSummary aria-controls='panel1a-content' id='panel1a-header'>
        <PairingHeader {...rest} />
      </AccordionSummary>
      {renderAccordionDetails && !pairingIsBye && (
        <AccordionDetails>
          <PairingButtons
            firstPlayer={props.firstPlayer}
            secondPlayer={props.secondPlayer}
            completedMatch={props.completedMatch}
          />
        </AccordionDetails>
      )}
    </Accordion>
  );
};

export default PairingAccordion;
