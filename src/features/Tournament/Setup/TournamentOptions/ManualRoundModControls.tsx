import { recommendedRounds, recommendedTopCut } from '../../Pairings/utils/rounds';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import DialogContentText from '@mui/material/DialogContentText';

import { useMemo } from 'react';
import { TopCutType } from '../../state/TournamentState';
import styled from '@emotion/styled';
import { COLORS } from '../../../../app/colors';
import { getNumRoundsWarningString } from '../utils/errorMessages';

interface ManualRoundModControlsProps {
  numPlayers: number;
  numRounds: number;
  setNumRounds: (numRounds: number) => void;
  topCut: TopCutType;
  setTopCut: (topCut: TopCutType) => void;
}

const WarningString = styled(DialogContentText)`
  color: ${COLORS.appWarning};
`;

export const ManualRoundModControls = (props: ManualRoundModControlsProps) => {
  const recommendedNumRounds = useMemo(
    () => recommendedRounds(props.numPlayers),
    [props.numPlayers]
  );

  const recommendedCut = useMemo(
    () => recommendedTopCut(props.numPlayers),
    [props.numPlayers]
  );

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
      <WarningString>{getNumRoundsWarningString(props.numRounds, recommendedNumRounds)}</WarningString>
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
