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
import { ManualRoundSettings } from './ManualRoundSettings';
import { TopCutType } from '../state/TournamentState';

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
  numRounds: number;
  setNumRounds: (numRounds: number) => void;
  topCut: TopCutType;
  setTopCut: (topCut: TopCutType) => void;
}

const ManualRoundModControls = (props: ManualRoundModControlsProps) => {
  // const displayWarning: boolean = numRounds > recommendedRounds(props.numPlayers);

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Slider
            aria-label='Number of rounds'
            value={props.numRounds}
            onChange={(_, value) => props.setNumRounds(value as number)}
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
        control={
          <Checkbox
            checked={!!props.topCut}
            onChange={(_, checked) => {
              if (checked) {
                props.setTopCut(recommendedTopCut(props.numPlayers));
              } else {
                props.setTopCut(undefined);
              }
            }}
          />
        }
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
  manualRoundSettings: ManualRoundSettings | undefined;
  setManualRoundSettings: (settings: ManualRoundSettings) => void;
}

const EditNumberRoundsModal = (props: EditNumberRoundsModalProps) => {
  const [recommendedOption, setRecommendedOption] = useState<boolean>(true);
  const [numRounds, setNumRounds] = useState<number>(
    props.manualRoundSettings?.numRounds ?? recommendedRounds(props.numPlayers)
  );
  const [topCut, setTopCut] = useState<TopCutType>(
    props.manualRoundSettings?.topCut ?? recommendedTopCut(props.numPlayers)
  );

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
        {!recommendedOption && (
          <ManualRoundModControls
            numPlayers={props.numPlayers}
            numRounds={numRounds}
            setNumRounds={(numRounds: number) => {
              setNumRounds(numRounds);
            }}
            topCut={topCut}
            setTopCut={(topCut: TopCutType) => {
              setTopCut(topCut);
            }}
          />
        )}
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
  manualRoundSettings: ManualRoundSettings | undefined;
  setManualRoundSettings: (settings: ManualRoundSettings) => void;
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
      {editRoundsDisplayOpen && (
        <EditNumberRoundsModal
          open={editRoundsDisplayOpen}
          dismissModal={() => setEditRoundsDisplayOpen(false)}
          numPlayers={props.players.length}
          manualRoundSettings={props.manualRoundSettings}
          setManualRoundSettings={props.setManualRoundSettings}
        />
      )}
    </RoundDisplayContainer>
  );
};
