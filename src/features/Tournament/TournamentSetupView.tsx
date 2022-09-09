import React from 'react';
import { Player } from './Player/types';
import { useDispatch } from 'react-redux';
import { loadPlayers } from './state/tournamentSlice';
import { ButtonWithDisabledTooltip } from '../../common/ButtonWithDisabledTooltip';
import Typography from '@mui/material/Typography';
import { prettyCut, prettyRecommendedRounds } from './Pairings/utils/rounds';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import { PlayerEntry } from './Setup/PlayerEntry';

export const TournamentSetupView = () => {
  const [players, setPlayers] = React.useState<Player[]>([]);
  const dispatch = useDispatch();

  return (
    <div>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12} md={4} lg={3}>
          <Card sx={{ p: 3 }}>
            <CardContent>
              <Stack>
                <Typography variant='h5'>{`${prettyRecommendedRounds(
                  players.length
                )}, ${prettyCut(players.length)}`}</Typography>
                <ButtonWithDisabledTooltip
                  onClick={() => {
                    dispatch(loadPlayers(players));
                  }}
                  disabled={players.length <= 2}
                  disabledTooltipText='Must have more than 2 players to start a tournament.'
                >
                  Start tournament
                </ButtonWithDisabledTooltip>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <PlayerEntry
            players={players}
            setPlayers={(players: Player[]) => {
              setPlayers(players);
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
};
