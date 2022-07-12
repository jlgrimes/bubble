import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { PairingHeaderProps, PairingHeader } from './PairingHeader';

interface PairingAccordionProps extends PairingHeaderProps {
  expanded: boolean;
  handleChange: Function;
}

const PairingAccordion = (props: PairingAccordionProps) => {
  return (
    <Accordion expanded={props.expanded} onChange={props.handleChange()}>
        <AccordionSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          expandIcon={<ExpandMoreIcon />}
        >
          <PairingHeader {...props} />
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ButtonGroup size="large">
              <Button>Win</Button>
              <Button>Tie</Button>
              <Button>Win</Button>
            </ButtonGroup>
          </Typography>
        </AccordionDetails>
      </Accordion>
  )
}

export default PairingAccordion;