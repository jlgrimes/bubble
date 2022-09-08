import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import { Player } from './Player/types';
import { createPlayer } from './Player/utils/player';
import { useDispatch } from 'react-redux';
import { initializeTournament, loadPlayers } from './state/tournamentSlice';
import { ButtonWithDisabledTooltip } from '../../common/ButtonWithDisabledTooltip';
import { Input } from '../../common/Input';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { prettyCut, prettyRecommendedRounds } from './Pairings/utils/rounds';
import { PlayerList } from './Setup/PlayerList';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';

export const TournamentSetupView = () => {
  const [currentPlayerField, setCurrentPlayerField] =
    React.useState<string>('');
  const [players, setPlayers] = React.useState<Player[]>([]);
  const dispatch = useDispatch();

  const submitInput = () => {
    setPlayers([...players, createPlayer(currentPlayerField)]);
    setCurrentPlayerField('');
  };

  const updatePlayerName = (playerId: string, newName: string) => {
    setPlayers(players.map((player) => {
      if (player.id === playerId) {
        return {
          ...player,
          name: newName
        }
      }

      return player;
    }))
  };

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
          <Stack spacing={2}>
            <Input
              id='add-player-input'
              fullWidth
              endAdornment={
                <IconButton
                  disabled={currentPlayerField === ''}
                  onClick={() => submitInput()}
                >
                  <AddIcon />
                </IconButton>
              }
              label='Add player'
              placeholder='Player name'
              value={currentPlayerField}
              setValue={setCurrentPlayerField}
              onKeyDown={e => {
                if (e.key === 'Enter' && currentPlayerField !== '') {
                  submitInput();
                }
              }}
            />
            <PlayerList players={players} updatePlayerName={updatePlayerName} />
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};
