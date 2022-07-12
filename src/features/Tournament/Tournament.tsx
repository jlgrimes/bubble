import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import PairingAccordion from './Pairings/PairingAccordion';
import type { Pairing } from './Pairings/types';
import type { Player } from './Player/types';

const Tournament = () => {
  const [expandedPairing, setExpandedPairing] = React.useState<number | boolean>(false);

  const pairings: Pairing[] = useSelector(
    (state: RootState) => state.tournament.pairings
  );
  const players: Player[] = useSelector(
    (state: RootState) => state.tournament.players
  );

  return (
    <div>
      {pairings.map((pairing: Pairing, idx: number) => (
        <PairingAccordion
          expanded={expandedPairing === idx}
          handleChange={() => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpandedPairing(isExpanded ? idx : false);
          }}
          firstPlayer={players.find((player) => player.id === pairing.playerIds[0])}
          secondPlayer={players.find((player) => player.id === pairing.playerIds[1])}
        />
      ))}
    </div>
  );
};

export default Tournament;
