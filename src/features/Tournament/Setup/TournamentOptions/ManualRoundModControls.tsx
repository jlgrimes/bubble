import { recommendedTopCut } from '../../Pairings/utils/rounds';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';

import { useMemo } from 'react';
import { TopCutType } from '../../state/TournamentState';

interface ManualRoundModControlsProps {
  numPlayers: number;
  numRounds: number;
  setNumRounds: (numRounds: number) => void;
  topCut: TopCutType;
  setTopCut: (topCut: TopCutType) => void;
}

export const ManualRoundModControls = (props: ManualRoundModControlsProps) => {
  const recommendedCut = useMemo(
    () => recommendedTopCut(props.numPlayers),
    [props.numPlayers]
  );
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
                props.setTopCut(recommendedCut);
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
