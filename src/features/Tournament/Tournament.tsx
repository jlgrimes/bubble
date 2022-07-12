import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import PairingAccordion from './Pairings/PairingAccordion';
import type { Pairing, Match } from './Pairings/types';
import type { Player } from './Player/types';

const Tournament = () => {
  const [expandedPairing, setExpandedPairing] = React.useState<
    number | boolean
  >(false);

  const pairings: Pairing[] = useSelector(
    (state: RootState) => state.tournament.pairings
  );
  const players: Player[] = useSelector(
    (state: RootState) => state.tournament.players
  );
  const matchResults: Match[] = useSelector(
    (state: RootState) => state.tournament.matchResults
  );

  return (
    <div>
      {pairings.map((pairing: Pairing, idx: number) => {
        const disabled = matchResults.some(
          (match: Match) =>
            match.playerIds[0] === pairing.playerIds[0] &&
            match.playerIds[1] === pairing.playerIds[1]
        )
       return  (
        <PairingAccordion
          disabled={disabled}
          expanded={expandedPairing === idx && !disabled}
          handleChange={() =>
            (event: React.SyntheticEvent, isExpanded: boolean) => {
              setExpandedPairing(isExpanded ? idx : false);
            }}
          // TODO: error handing for find?
          firstPlayer={
            players.find(player => player.id === pairing.playerIds[0])!
          }
          secondPlayer={
            players.find(player => player.id === pairing.playerIds[1])!
          }
        />
      )})}
    </div>
  );
};

export default Tournament;
