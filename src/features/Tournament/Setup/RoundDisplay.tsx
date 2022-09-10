import Typography from '@mui/material/Typography';
import { Player } from '../Player/types';
import { prettyCut, prettyRecommendedRounds } from '../Pairings/utils/rounds';
import styled from '@emotion/styled';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import { ManualRoundSettings } from './ManualRoundSettings';

import { EditNumberRoundsModal } from './TournamentOptions/EditRoundsModal';

const RoundDisplayContainer = styled.div`
  display: flex;
  gap: 4px;

  .modify-button {
    svg {
      font-size: 1rem;
    }
  }
`;

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
