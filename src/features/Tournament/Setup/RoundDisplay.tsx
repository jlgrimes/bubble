import Typography from '@mui/material/Typography';
import { Player } from '../Player/types';
import {
  prettyCut,
  prettyRounds,
  recommendedRounds,
  recommendedTopCut,
} from '../Pairings/utils/rounds';
import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { ManualRoundSettings } from './ManualRoundSettings';

import { EditNumberRoundsModal } from './TournamentOptions/EditRoundsModal';
import { COLORS } from '../../../app/colors';

const RoundDisplayContainer = styled.div`
  display: flex;
  gap: 4px;

  .modify-button {
    svg {
      font-size: 1rem;
    }
  }
`;

const CustomRoundWarning = styled.div`
  padding-top: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${COLORS.appWarning};
`;

interface RoundDisplayProps {
  players: Player[];
  manualRoundSettings: ManualRoundSettings | undefined;
  setManualRoundSettings: (settings: ManualRoundSettings | undefined) => void;
}

export const RoundDisplay = (props: RoundDisplayProps) => {
  const [editRoundsDisplayOpen, setEditRoundsDisplayOpen] =
    useState<boolean>(false);
  const numberRounds = props.manualRoundSettings
    ? props.manualRoundSettings.numRounds
    : recommendedRounds(props.players.length);
  const topCut = props.manualRoundSettings
    ? props.manualRoundSettings.topCut
    : recommendedTopCut(props.players.length);

  return (
    <div>
      <Typography>New tournament</Typography>
      <RoundDisplayContainer>
        <Typography variant='h5'>{`${prettyRounds(numberRounds)}, ${prettyCut(
          topCut
        )}`}</Typography>
        <IconButton
          aria-label='Edit tournament button'
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
      {props.manualRoundSettings && (
        <CustomRoundWarning role='heading'>Custom</CustomRoundWarning>
      )}
    </div>
  );
};
