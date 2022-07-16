import { generateEmptyPlayers, SAMPLE_PLAYER } from '../../../../helpers/testConstants';
import { Match } from '../../Pairings/types';
import reducer, {
  addPlayer,
  nextRound,
  removePlayer,
} from '../tournamentSlice';
import { TournamentState } from '../TournamentState';

describe('tournament reducers', () => {
  const initialState: TournamentState = {
    round: 0,
    pairings: [],
    players: [],
    matchResults: [],
  }

  describe('addPlayer', () => {
    it('should add player', () => {
      expect(reducer(initialState, addPlayer(SAMPLE_PLAYER))).toEqual({
        ...initialState,
        players: [SAMPLE_PLAYER],
      });
    });
  });

  describe('removePlayer', () => {
    it('should remove player', () => {
      const previousState = {
        ...initialState,
        players: [SAMPLE_PLAYER],
      };
      expect(reducer(previousState, removePlayer('0'))).toEqual(initialState);
    });
  });

  describe('nextRound', () => {
    it('should generate next round pairings with bye', () => {
      const players = generateEmptyPlayers(5);
      const previousState = {
        round: 1,
        pairings: [['0', '1'], ['2', '3'], ['4']],
        players,
        matchResults: [
          { playerIds: ['0', '1'], result: 'win' } as Match,
          { playerIds: ['2', '3'], result: 'win' } as Match,
          { playerIds: ['4'], result: 'win' } as Match,
        ],
        deterministicPairing: true
      };
      expect(reducer(previousState, nextRound())).toMatchSnapshot();
    });
  });
});
