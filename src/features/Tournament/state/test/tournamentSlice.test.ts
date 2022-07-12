import { SAMPLE_PLAYER } from '../../../../helpers/testConstants';
import reducer, {
  initialState,
  addPlayer,
  removePlayer,
} from '../tournamentSlice';

describe('tournament reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: undefined })).toEqual(initialState);
  });

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
});
