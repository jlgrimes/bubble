import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import PairingAccordion from './Pairings/PairingAccordion';
import type { Pairing } from './Pairings/types';
import type { Player } from './Player/types';

const Tournament = () => {
  const pairings: Pairing[] = useSelector((state: RootState) => state.tournament.pairings);
  const players: Player[] = useSelector((state: RootState) => state.tournament.players);

  return (
    <div>
      {pairings.map((pairing: Pairing) => (
        <PairingAccordion />
      ))}
    </div>
  );
};

export default Tournament;