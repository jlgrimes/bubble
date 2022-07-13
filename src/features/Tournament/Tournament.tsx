import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { PairingsView } from './PairingsView';
import { startTournament } from './state/tournamentActions';
import { TournamentStateView } from './TournamentStateView';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Tournament = () => {
  const dispatch = useAppDispatch();

  // React.useEffect(() => {
  //   dispatch(startTournament());
  // }, []);

  return (
    <Stack spacing={4}>
      <Item>
        <TournamentStateView />
      </Item>
      <Item>
        <PairingsView />
      </Item>
    </Stack>
  );
};

export default Tournament;
