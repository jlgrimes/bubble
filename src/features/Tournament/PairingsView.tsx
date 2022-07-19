import styled from '@emotion/styled';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import type { Match } from './Pairings/types';
import type { Player } from './Player/types';
import { Pairing } from './Pairings/Pairing';
import type { MatchFilter } from './Pairings/types';

import Grid from '@mui/material/Grid';
import { prunePairings } from './Pairings/utils/ui';
import { TournamentOptionsCard } from './TournamentOptionsCard';

const PairingsList = styled.div`
  text-align: center;
  width: fit-content;
`;

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

  const prunedPairings = React.useMemo(
    () =>
      prunePairings(
        searchQuery,
        completedMatchFilter,
        players,
        pairings,
        matchResults
      ),
    [searchQuery, completedMatchFilter, players, pairings, matchResults]
  );

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      <Grid item xs={12} md={4}>
        <TournamentOptionsCard
          completedMatchFilter={completedMatchFilter}
          setCompletedMatchFilter={setCompletedMatchFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <PairingsList>
          {prunedPairings.map((pairing: string[], idx: number) => (
            <Pairing
              pairing={pairing}
              idx={idx}
              expandedPairing={expandedPairing}
              setExpandedPairing={setExpandedPairing}
              key={idx}
            />
          ))}
        </PairingsList>
      </Grid>
    </Grid>
  );
};
