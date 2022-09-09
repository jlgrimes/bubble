import Typography from '@mui/material/Typography';
import { Player } from '../Player/types';
import {
  prettyCut,
  prettyRecommendedRounds,
  recommendedRounds,
  recommendedTopCut,
} from '../Pairings/utils/rounds';
import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

const RoundDisplayContainer = styled.div`
  display: flex;
  gap: 4px;

  .modify-button {
    svg {
      font-size: 1rem;
    }
  }
`;

interface ManualRoundModControlsProps {
  numPlayers: number;
}

const ManualRoundModControls = (props: ManualRoundModControlsProps) => {
  const [numRounds, setNumRounds] = useState<number>(
    recommendedRounds(props.numPlayers)
  );
  const [topCutEnabled, setTopCutEnabled] = useState<boolean>(
    !!recommendedTopCut(props.numPlayers)
  );

  const dispatch = useDispatch();

  const displayWarning: boolean = numRounds > recommendedRounds(props.numPlayers);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Slider
            aria-label='Number of rounds'
            value={numRounds}
            onChange={(_, value) => setNumRounds(value as number)}
            valueLabelDisplay='auto'
            step={1}
            marks
            min={1}
            max={10}
          />
        }
        label='Number of rounds'
      />
      <FormControlLabel
        control={<Checkbox checked={topCutEnabled} />}
        label='Top cut'
      />
    </FormGroup>
  );
};

interface EditNumberRoundsModalProps {
  /**
   * If modal is open or not. Controlled by edit button.
   */
  open: boolean;
  /**
   * Function to dismiss the modal.
   */
  dismissModal: () => void;
  /**
   * Number of players currently in the tournament.
   */
  numPlayers: number;
}

const EditNumberRoundsModal = (props: EditNumberRoundsModalProps) => {
  const [recommendedOption, setRecommendedOption] = useState<boolean>(true);

  return (
    <Dialog open={props.open} onClose={props.dismissModal}>
      <DialogTitle>Tournament setup options</DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={recommendedOption}
                onChange={(_, checked) => setRecommendedOption(checked)}
              />
            }
            label='Let Bubble decide rounds for me'
          />
        </FormGroup>
        <DialogContentText>
          Bubble intelligently plans your tournament's swiss and top cut rounds
          based off how many people are registered. You can disable this mode to
          set them manually (not recommended).
        </DialogContentText>
        {!recommendedOption && <ManualRoundModControls numPlayers={props.numPlayers} />}
      </DialogContent>
      <DialogActions>
        <Button aria-label='Cancel' onClick={props.dismissModal}>
          Cancel
        </Button>
        <Button
          aria-label='Save changes'
          onClick={props.dismissModal}
          autoFocus
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface RoundDisplayProps {
  players: Player[];
}

export const RoundDisplay = (props: RoundDisplayProps) => {
  const [editRoundsDisplayOpen, setEditRoundsDisplayOpen] =
    useState<boolean>(false);

  return (
    <RoundDisplayContainer>
      <Typography variant='h5'>{`${prettyRecommendedRounds(
        props.players.length
      )}, ${prettyCut(props.players.length)}`}</Typography>
      <IconButton
        className='modify-button'
        onClick={() => setEditRoundsDisplayOpen(true)}
      >
        <EditIcon />
      </IconButton>
      <EditNumberRoundsModal
        open={editRoundsDisplayOpen}
        dismissModal={() => setEditRoundsDisplayOpen(false)}
        numPlayers={props.players.length}
      />
    </RoundDisplayContainer>
  );
};
