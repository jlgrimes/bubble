import { Player } from '../../types/Player';
import { convertMatchToPlayerMatch, getMatchPoints } from '../player';

describe('player helpers', () => {
  const player: Player = {
    id: '0',
    name: 'Player',
    matches: [
      { opponentId: '1', result: 'win' },
      { opponentId: '2', result: 'loss' },
      { opponentId: '3', result: 'tie' },
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

  describe('convertMatchToPlayerMatch', () => {
    it('should preserve match result if player is listed first', () => {
      expect(convertMatchToPlayerMatch(player, { result: 'win', playerIds: ['0', '4'] })).toEqual({ opponentId: '4', result: 'win'});
    });

    it('should inverse match result if player is listed second', () => {
      expect(convertMatchToPlayerMatch(player, { result: 'win', playerIds: ['4', '0'] })).toEqual({ opponentId: '4', result: 'loss'});
    });
  });
});
