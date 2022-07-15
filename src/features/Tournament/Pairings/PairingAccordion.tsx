import Accordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
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
  
  .MuiAccordionSummary-content, .MuiAccordionSummary-content.Mui-expanded {
    margin: 0;
  }
`;

const PairingAccordion = (props: PairingAccordionProps) => {
  return (
    <Accordion expanded={props.expanded} onChange={props.handleChange()}>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <PairingHeader {...props} />
        </AccordionSummary>
        <AccordionDetails>
          <PairingButtons firstPlayer={props.firstPlayer} secondPlayer={props.secondPlayer} />
        </AccordionDetails>
      </Accordion>
  )
}

export default PairingAccordion;