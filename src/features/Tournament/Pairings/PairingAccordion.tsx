import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { PairingHeaderProps, PairingHeader } from './PairingHeader';
import { useDispatch } from 'react-redux';
import { submitMatchResult } from '../state/tournamentSlice';
import { MatchResult } from './types';

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

const PairingButtons = (props: PairingHeaderProps) => {
  const dispatch = useDispatch();
  const playerIds: string[] = [props.firstPlayer.id, props.secondPlayer.id];

  const handleClick = (result: MatchResult) => {
    dispatch(submitMatchResult({ playerIds, result }))
  };

  return (
    <ButtonGroup variant="contained" size="large">
      <Button onClick={() => handleClick('win')}>Win</Button>
      <Button onClick={() => handleClick('tie')}>Tie</Button>
      <Button onClick={() => handleClick('loss')}>Win</Button>
    </ButtonGroup>
  )
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