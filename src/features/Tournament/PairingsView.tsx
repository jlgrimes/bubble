import styled from '@emotion/styled';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import PairingAccordion from './Pairings/PairingAccordion';
import type { Match } from './Pairings/types';
import type { Player } from './Player/types';
import { alterWithCompletedMatch } from './Player/utils/player';
import { submitMatchResult } from './state/tournamentSlice';

import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import { getExistingMatch } from './Pairings/utils/match';

const PairingsViewContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const PairingsList = styled.div`
  text-align: center;
  width: fit-content;
`;

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

  React.useEffect(() => {
    if (secondPlayer?.id === 'bye') {
      dispatch(
        submitMatchResult({
          playerIds: [props.pairing[0], 'bye'],
          result: 'win',
        })
      );
    }
  }, [round]);

  return (
    <PairingAccordion
      key={props.idx}
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

type MatchFilter = 'completed' | 'incomplete' | undefined;

interface PairingsFiltersProps {
  completedMatchFilter: MatchFilter;
  setCompletedMatchFilter: (matchFilter: MatchFilter) => void;
}

const PairingsFilters = (props: PairingsFiltersProps) => {
  return (
    <FormControl>
      <FormLabel htmlFor='pairing-filters'>Pairing filters</FormLabel>
      <FormGroup id='pairing-filters'>
        <FormControlLabel
          control={
            <Checkbox
              checked={props.completedMatchFilter === 'completed'}
              onChange={e => {
                e.target.checked
                  ? props.setCompletedMatchFilter('completed')
                  : props.setCompletedMatchFilter(undefined);
              }}
            />
          }
          label='Completed matches'
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={props.completedMatchFilter === 'incomplete'}
              onChange={e => {
                e.target.checked
                  ? props.setCompletedMatchFilter('incomplete')
                  : props.setCompletedMatchFilter(undefined);
              }}
            />
          }
          label='Incomplete matches'
        />
      </FormGroup>
    </FormControl>
  );
};

export const PairingsView = () => {
  const [expandedPairing, setExpandedPairing] = React.useState<
    number | boolean
  >(false);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [completedMatchFilter, setCompletedMatchFilter] =
    React.useState<MatchFilter>(undefined);

  const round: number = useSelector(
    (state: RootState) => state.tournament.round
  );
  const players: Player[] = useSelector(
    (state: RootState) => state.tournament.players
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

  const searchPrunedPairings =
    searchQuery === ''
      ? pairings
      : pairings.filter(
          (pairing, idx) =>
            players
              .find(player => player.id === pairing[0])
              ?.name.toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            players
              .find(player => player.id === pairing[1])
              ?.name.toLowerCase()
              .includes(searchQuery.toLowerCase())
        );
  const prunedPairings = searchPrunedPairings.filter(pairing =>
    completedMatchFilter === 'completed'
      ? getExistingMatch(pairing, matchResults)
      : completedMatchFilter === 'incomplete'
      ? !getExistingMatch(pairing, matchResults)
      : true
  );

  return (
    <PairingsViewContainer>
      <PairingsFilters
        completedMatchFilter={completedMatchFilter}
        setCompletedMatchFilter={setCompletedMatchFilter}
      />
      <FormControl>
        <InputLabel htmlFor='component-outlined'>Search</InputLabel>
        <OutlinedInput
          id='component-outlined'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          label='Search'
        />
      </FormControl>
      <PairingsList>
        {prunedPairings.map((pairing: string[], idx: number) => (
          <Pairing
            pairing={pairing}
            idx={idx}
            expandedPairing={expandedPairing}
            setExpandedPairing={setExpandedPairing}
          />
        ))}
      </PairingsList>
    </PairingsViewContainer>
  );
};
