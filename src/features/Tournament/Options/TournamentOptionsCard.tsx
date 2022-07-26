import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { MatchFilter } from '../Pairings/types';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { RootState } from '../../../app/store';
import { Grid, Typography } from '@mui/material';
import { NextRoundButton } from './NextRoundButton';
import { AutoWins } from './AutoWins';
import { RepairButton } from './RepairButton';
import { devMode } from '../../../helpers/url';

interface TournamentOptionsCardProps {
  completedMatchFilter?: MatchFilter;
  setCompletedMatchFilter?: (matchFilter: MatchFilter) => void;
  searchQuery?: string;
  setSearchQuery?: (searchQuery: string) => void;
}

export const TournamentOptionsCard = (props: TournamentOptionsCardProps) => {
  const roundText = useSelector((state: RootState) => {
    if (state.tournament.viewState === 'standings' && state.tournament.topCut) {
      return 'Standings';
    }

    if (
      state.tournament.viewState === 'final-standings' ||
      (state.tournament.viewState === 'standings' && !state.tournament.topCut)
    ) {
      return 'Final standings';
    }

    if (state.tournament.viewState === 'top-cut') {
      if (state.tournament.pairings.length === 4) {
        return 'Top 8';
      }
      if (state.tournament.pairings.length === 2) {
        return 'Top 4';
      }
      if (state.tournament.pairings.length === 1) {
        return 'Finals';
      }
    }

    return `Round ${state.tournament.round} of ${state.tournament.maxRounds}`;
  });
  return (
    <Card sx={{ p: 3 }}>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant='h4'>{roundText}</Typography>
          </Grid>
          <Grid item xs={12}>
            <NextRoundButton />
          </Grid>
          <Grid item xs={12}>
            <RepairButton />
          </Grid>
          {devMode && (
            <Grid item xs={12}>
              <AutoWins />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};
