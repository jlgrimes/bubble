import {
  recommendedRounds,
  recommendedTopCut,
} from '../../Pairings/utils/rounds';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Slider from '@mui/material/Slider';
import DialogContentText from '@mui/material/DialogContentText';

import { useMemo } from 'react';
import { TopCutType } from '../../state/TournamentState';
import styled from '@emotion/styled';
import { COLORS } from '../../../../app/colors';
import {
  getNumRoundsWarningString,
  getTopCutWarningString,
} from '../utils/errors';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Input from '@mui/material/Input';

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

const RoundForm = styled.div`
  display: flex;
  gap: 32px;
`;

const ManualFormGroup = styled(FormGroup)`
  padding-top: 24px;
  gap: 16px;
`;

const ManualFormControl = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  .MuiFormControl-root {
    width: 100%;
  }
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setNumRounds(
      event.target.value === '' ? 1 : Number(event.target.value)
    );
  };

  const handleBlur = () => {
    if (props.numRounds < 1) {
      props.setNumRounds(1);
    } else if (props.numRounds > 10) {
      props.setNumRounds(10);
    }
  };

  return (
    <ManualFormGroup>
      <ManualFormControl>
        <FormControl>
          <FormLabel id='number-rounds-slider'>
            Number of rounds
          </FormLabel>
          <RoundForm>
            <Input
              value={props.numRounds}
              size='small'
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 1,
                min: 1,
                max: 10,
                type: 'number',
                'aria-label': 'Number of rounds input',
              }}
            />
            <Slider
              aria-label='Number of rounds slider'
              value={props.numRounds}
              onChange={(_, value) => props.setNumRounds(value as number)}
              valueLabelDisplay='auto'
              step={1}
              marks
              min={1}
              max={10}
            />
          </RoundForm>
        </FormControl>
        <WarningString>
          {getNumRoundsWarningString(props.numRounds, recommendedNumRounds)}
        </WarningString>
      </ManualFormControl>

      <ManualFormControl>
        <FormControl>
          <FormLabel id='top-cut-type-radio'>Top cut type</FormLabel>
          <RadioGroup
            row
            aria-labelledby='top-cut-type-radio'
            name='top-cut-type-radio'
            value={props.topCut ?? 'no-cut'}
            onChange={(_, value) =>
              props.setTopCut(
                value === 'no-cut' ? undefined : (value as TopCutType)
              )
            }
          >
            <FormControlLabel
              value='no-cut'
              control={<Radio />}
              label='No cut'
            />
            <FormControlLabel
              value='top-four'
              control={<Radio />}
              label='Top four'
            />
            <FormControlLabel
              value='top-eight'
              control={<Radio />}
              label='Top eight'
            />
          </RadioGroup>
        </FormControl>

        <WarningString>
          {getTopCutWarningString(props.topCut, recommendedCut)}
        </WarningString>
      </ManualFormControl>
    </ManualFormGroup>
  );
};
