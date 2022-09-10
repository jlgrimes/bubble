import {
  recommendedRounds,
  recommendedTopCut,
} from '../../Pairings/utils/rounds';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useState } from 'react';
import { ManualRoundSettings } from '../ManualRoundSettings';
import { TopCutType } from '../../state/TournamentState';

import { ManualRoundModControls } from '../TournamentOptions/ManualRoundModControls';

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
  setManualRoundSettings: (settings: ManualRoundSettings | undefined) => void;
}

export const EditNumberRoundsModal = (props: EditNumberRoundsModalProps) => {
  const [recommendedOption, setRecommendedOption] = useState<boolean>(!props.manualRoundSettings);
  const [numRounds, setNumRounds] = useState<number>(
    props.manualRoundSettings?.numRounds ?? recommendedRounds(props.numPlayers)
  );
  const [topCut, setTopCut] = useState<TopCutType>(
    props.manualRoundSettings?.topCut ?? recommendedTopCut(props.numPlayers)
  );

  const applyModalChanges = () => {
    if (recommendedOption) {
      props.setManualRoundSettings(undefined);
    } else {
      props.setManualRoundSettings({
        numRounds,
        topCut,
      });
    }

    props.dismissModal();
  };

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
        <Button aria-label='Save changes' onClick={applyModalChanges} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
