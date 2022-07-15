import { SAMPLE_PLAYER } from '../../../../helpers/testConstants';
import reducer, {
  addPlayer,
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
      expect(reducer(previousState, removePlayer(0))).toEqual(initialState);
    });
  });
});
