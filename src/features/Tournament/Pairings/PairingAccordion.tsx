import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { PairingHeaderProps, PairingHeader } from './PairingHeader';
import { PairingButtons } from './PairingButtons';

interface PairingAccordionProps extends PairingHeaderProps {
  /**
   * If the accordion is disabled - ie if the match result was already reported.
   */
  disabled: boolean;
  /**
   * If the accordion is expanded. Controlled by if any other accordion is expanded.
   */
  expanded: boolean;
  /**
   * handle change when the accordion
   */
  handleChange: Function;
}

const PairingAccordion = (props: PairingAccordionProps) => {
  return (
    <Accordion disabled={props.disabled} expanded={props.expanded} onChange={props.handleChange()}>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          expandIcon={<ExpandMoreIcon />}
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