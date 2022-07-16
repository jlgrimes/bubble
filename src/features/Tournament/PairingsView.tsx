import styled from '@emotion/styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import PairingAccordion from './Pairings/PairingAccordion';
import type { Match } from './Pairings/types';
import type { Player } from './Player/types';
import { alterWithCompletedMatch } from './Player/utils/player';
import { submitMatchResult } from './state/tournamentSlice';

const PairingsViewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const PairingsList = styled.div`
  width: fit-content;
`;

interface PairingProps {
  pairing: string[];
  idx: number;
  expandedPairing: number | boolean,
  setExpandedPairing: Function
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
  
  const existingMatch: Match | undefined = matchResults.find(
    (match: Match) =>
      match.playerIds[0] === props.pairing[0] &&
      match.playerIds[1] === props.pairing[1]
  );
  // TODO: error handing for find?
  const firstPlayer: Player = players.find(
    player => player.id === props.pairing[0]
  )!;
  const secondPlayer: Player = players.find(
    player => player.id === props.pairing[1]
  )!;
  
  React.useEffect(() => {
    if (secondPlayer.id === 'bye') {
      dispatch((submitMatchResult({ playerIds: [props.pairing[0], 'bye'], result: 'win'})))
    }
  }, [round]);

  return (
    <PairingAccordion
      key={props.idx}
      completedMatch={existingMatch}
      expanded={props.expandedPairing === props.idx}
      handleChange={() =>
        (event: React.SyntheticEvent, isExpanded: boolean) => {
          props.setExpandedPairing(isExpanded ? props.idx : false);
        }}
      firstPlayer={alterWithCompletedMatch(firstPlayer, existingMatch)}
      secondPlayer={alterWithCompletedMatch(secondPlayer, existingMatch)}
      table={props.idx + 1}
    />
  );
}

export const PairingsView = () => {
  const [expandedPairing, setExpandedPairing] = React.useState<
    number | boolean
  >(false);

  const round: number = useSelector(
    (state: RootState) => state.tournament.round
  );
  const pairings: string[][] = useSelector(
    (state: RootState) => state.tournament.pairings
  );
  const matchResults: Match[] = useSelector(
    (state: RootState) => state.tournament.matchResults
  );

  // Collapse any open accordion when round proceeds.
  React.useEffect(() => {
    setExpandedPairing(false);
  }, [round]);

  // Collapse any open accordion when match result is submitted.
  React.useEffect(() => {
    setExpandedPairing(false);
  }, [matchResults.length]);

  return (
    <PairingsViewContainer>
      <PairingsList>
        {pairings.map((pairing: string[], idx: number) => (
          <Pairing pairing={pairing} idx={idx} expandedPairing={expandedPairing} setExpandedPairing={setExpandedPairing}/>
        ))}
      </PairingsList>
    </PairingsViewContainer>
  );
};
