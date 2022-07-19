import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { MatchFilter } from '../Pairings/types';
import { PairingFilters } from './PairingFilters';
import { PairingSearch } from './PairingSearch';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import { Grid, Typography } from '@mui/material';
import { NextRoundButton } from './NextRoundButton';

interface TournamentOptionsCardProps {
  completedMatchFilter: MatchFilter;
  setCompletedMatchFilter: (matchFilter: MatchFilter) => void;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

export const TournamentOptionsCard = (props: TournamentOptionsCardProps) => {
  const roundText = useSelector(
    (state: RootState) => {
      if (state.tournament.viewState === 'top-cut') {
        if (state.tournament.pairings.length === 3) {
          return 'Top 8';
        }
        if (state.tournament.pairings.length === 2) {
          return 'Top 4';
        }
        if (state.tournament.pairings.length === 1) {
          return 'Finals';
        }
      }

      return `Round ${state.tournament.round}`;
    }
  );
  const maxRounds = useSelector(
    (state: RootState) => state.tournament.maxRounds
  );

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4">{roundText}</Typography>
          </Grid>
          <Grid item xs={12}>
            <NextRoundButton />
          </Grid>
          <Grid item xs={12}>
            <PairingFilters
              completedMatchFilter={props.completedMatchFilter}
              setCompletedMatchFilter={props.setCompletedMatchFilter}
            />
          </Grid>
          <Grid item xs={12}>
            <PairingSearch
              searchQuery={props.searchQuery}
              setSearchQuery={props.setSearchQuery}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
