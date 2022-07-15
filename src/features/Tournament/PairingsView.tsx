import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import PairingAccordion from './Pairings/PairingAccordion';
import type { Match } from './Pairings/types';
import type { Player } from './Player/types';
import { alterWithCompletedMatch } from './Player/utils/player';

export const PairingsView = () => {
  const [expandedPairing, setExpandedPairing] = React.useState<
    number | boolean
  >(false);

  const pairings: number[][] = useSelector(
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
      {pairings.map((pairing: number[], idx: number) => {
        const existingMatch: Match | undefined = matchResults.find(
          (match: Match) =>
            match.playerIds[0] === pairing[0] &&
            match.playerIds[1] === pairing[1]
        );
        const disabled = !!existingMatch;

        // TODO: error handing for find?
        const firstPlayer: Player = players.find(
          player => player.id === pairing[0]
        )!;
        const secondPlayer: Player = players.find(
          player => player.id === pairing[1]
        )!;

        return (
          <PairingAccordion
            disabled={disabled}
            expanded={expandedPairing === idx && !disabled}
            handleChange={() =>
              (event: React.SyntheticEvent, isExpanded: boolean) => {
                setExpandedPairing(isExpanded ? idx : false);
              }}
            firstPlayer={alterWithCompletedMatch(firstPlayer, existingMatch)}
            secondPlayer={alterWithCompletedMatch(secondPlayer, existingMatch)}
            table={idx + 1}
          />
        );
      })}
    </div>
  );
};
