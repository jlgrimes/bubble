import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PairingAccordion from './PairingAccordion';
import { RootState } from '../../../app/store';
import type { Match } from './types';
import type { Player } from '../Player/types';
import { alterWithCompletedMatch } from '../Player/utils/player';
import { submitMatchResult } from '../state/tournamentSlice';
import { getExistingMatch } from './utils/match';

interface PairingProps {
  pairing: string[];
  idx: number;
  expandedPairing: number | boolean;
  setExpandedPairing: Function;
}

export const Pairing = (props: PairingProps) => {
  const dispatch = useDispatch();

  const round: number = useSelector(
    (state: RootState) => state.tournament.round
  );
  const players: Player[] = useSelector(
    (state: RootState) => state.tournament.players
  );
  const matchResults: Match[] = useSelector(
    (state: RootState) => state.tournament.matchResults
  );

  const existingMatch = getExistingMatch(props.pairing, matchResults);
  // TODO: error handing for find?
  const firstPlayer: Player = players.find(
    player => player.id === props.pairing[0]
  )!;
  const secondPlayer: Player = players.find(
    player => player.id === props.pairing[1]
  )!;

  return (
    <PairingAccordion
      completedMatch={existingMatch}
      expanded={props.expandedPairing === props.idx}
      handleChange={() => (event: React.SyntheticEvent, isExpanded: boolean) => {
        props.setExpandedPairing(isExpanded ? props.idx : false);
      }}
      firstPlayer={alterWithCompletedMatch(firstPlayer, existingMatch)}
      secondPlayer={alterWithCompletedMatch(secondPlayer, existingMatch)}
      table={props.idx + 1}
    />
  );
};