import { Result } from '../../types/Match';
import { Player } from '../../types/Player';
import { getMatchPoints } from '../player';

describe('player helpers', () => {
  const player: Player = {
    id: '0',
    name: 'Player',
    matches: [
      { playerIds: ['0', '1'], result: Result.Win },
      { playerIds: ['0', '2'], result: Result.Loss },
      { playerIds: ['0', '3'], result: Result.Tie },
    ],
    record: {
      wins: 1,
      ties: 1,
      losses: 1
    }
  };
  describe('getMatchPoints', () => {
    it('should get correct match points', () => {
      expect(getMatchPoints(player)).toEqual(4);
    });
  });
});
