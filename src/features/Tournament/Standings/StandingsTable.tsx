import { Player } from '../Player/types';
import { getStylizedRecord } from '../Player/utils/record';
import { getRoundText } from '../Options/utils/round';
import {
  calculateOpponentOpponentWinRate,
  calculateResistance,
  getStylizedPercentage,
} from '../Standings/utils/resistance';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

export const StandingsTable = () => {
  const { standings, players, round } = useSelector(
    (state: RootState) => state.tournament
  );
  return (
    <Table size='small'>
      <TableHead>
        <TableRow>
          <TableCell>Standing</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Record</TableCell>
          <TableCell>Opponents' Win Rate</TableCell>
          <TableCell>Opponents' Opponents' Win Rate</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {standings?.map((player: Player, idx: number) => (
          <TableRow>
            <TableCell>{idx + 1}</TableCell>
            <TableCell>{player.name}</TableCell>
            <TableCell>
              {getStylizedRecord(player.record, player.dropped)}
            </TableCell>
            <TableCell>
              {getStylizedPercentage(calculateResistance(player, players))}
            </TableCell>
            <TableCell>
              {getStylizedPercentage(
                calculateOpponentOpponentWinRate(player, players)
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
