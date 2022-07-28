import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { MatchFilter } from '../Pairings/types';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { RootState } from '../../../app/store';
import { Grid, Typography } from '@mui/material';
import { NextRoundButton } from './NextRoundButton';
import { PrintButton } from './PrintButton';
import { AutoWins } from './AutoWins';
import { RepairButton } from './RepairButton';
import { devMode } from '../../../helpers/url';
import { getRoundText } from './utils/round';
import { KillTournamentButton } from './KillTournamentButton';
import { AbandonTournamentButton } from './AbandonTournamentButton';

interface TournamentOptionsCardProps {
  completedMatchFilter?: MatchFilter;
  setCompletedMatchFilter?: (matchFilter: MatchFilter) => void;
  searchQuery?: string;
  setSearchQuery?: (searchQuery: string) => void;
}

export const TournamentOptionsCard = (props: TournamentOptionsCardProps) => {
  const roundText = useSelector(getRoundText);

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
          <Grid item xs={12}>
            <PrintButton />
          </Grid>
          <Grid item xs={12}>
            <AbandonTournamentButton />
          </Grid>
          {devMode && (
            <>
              <Grid item xs={12}>
                <AutoWins />
              </Grid>
              <Grid item xs={12}>
                <KillTournamentButton />
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};
