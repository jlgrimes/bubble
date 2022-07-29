import styled from '@emotion/styled';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import type { Match } from './Pairings/types';
import type { Player } from './Player/types';
import { Pairing } from './Pairings/Pairing';
import type { MatchFilter } from './Pairings/types';
import { PairingFilter } from './Options/PairingFilter';

import Grid from '@mui/material/Grid';
import { prunePairings } from './Pairings/utils/ui';
import { TournamentOptionsCard } from './Options/TournamentOptionsCard';
import { Stack, Typography } from '@mui/material';

const PairingsList = styled.div`
  text-align: center;
  width: 100%;
  height: 85vh;
  overflow-x: visible;
`;

export const PairingsView = () => {
  const [expandedPairing, setExpandedPairing] = React.useState<
    number | boolean
  >(false);
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [completedMatchFilter, setCompletedMatchFilter] =
    React.useState<MatchFilter>(null);

  const round: number = useSelector(
    (state: RootState) => state.tournament.round
  );
  const players: Player[] = useSelector(
    (state: RootState) => state.tournament.players
  );
  // We store the original index of the table in the pairings array so we can use it for table number
  const pairings: string[][] = useSelector((state: RootState) =>
    state.tournament.pairings.map((pairing: string[], idx: number) => [...pairing, `${idx}`])
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
      <Grid item xs={12} md={4} lg={3}>
        <TournamentOptionsCard
          completedMatchFilter={completedMatchFilter}
          setCompletedMatchFilter={setCompletedMatchFilter}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={2}>
          <PairingFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            completedMatchFilter={completedMatchFilter}
            setCompletedMatchFilter={setCompletedMatchFilter}
          />
          <PairingsList>
            {prunedPairings.map((pairing: string[], idx: number) => {
              const pairingIdx: number = pairing[2] ? parseInt(pairing[2]) : idx;
              return (
                <Pairing
                  pairing={pairing}
                  idx={pairingIdx}
                  expandedPairing={expandedPairing}
                  setExpandedPairing={setExpandedPairing}
                  key={idx}
                />
              );
            })}
            {prunedPairings.length === 0 && (
              <Typography>No pairings with selected filters :(</Typography>
            )}
          </PairingsList>
        </Stack>
      </Grid>
    </Grid>
  );
};
