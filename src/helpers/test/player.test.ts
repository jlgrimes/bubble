import { Match, PlayerMatch } from '../../types/Match';
import { Player } from '../../types/Player';
import { convertMatchToPlayerMatch, getMatchPoints, getUpdatedPlayerAfterMatch } from '../player';

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
      const match: Match = { result: 'win', playerIds: ['0', '4'] };
      const expectedPlayerMatch: PlayerMatch = { opponentId: '4', result: 'win' };

      expect(convertMatchToPlayerMatch(player, match)).toEqual(expectedPlayerMatch);
    });

    it('should inverse match result if player is listed second', () => {
      const match: Match = { result: 'win', playerIds: ['4', '0'] };
      const expectedPlayerMatch: PlayerMatch = { opponentId: '4', result: 'loss' };

      expect(convertMatchToPlayerMatch(player, match)).toEqual(expectedPlayerMatch);
    });
  });

  describe('getUpdatedPlayerAfterMatch', () => {
    it('should get correct player after match', () => {
      const match: Match = { result: 'win', playerIds: ['4', '0'] };
      const expectedPlayerMatch: PlayerMatch = { opponentId: '4', result: 'loss' };
      const expectedPlayer: Player = {
        ...player,
        matches: [
          ...player.matches,
          expectedPlayerMatch
        ],
        record: {
          wins: 1,
          ties: 1,
          losses: 2
        }
      };

      expect(getUpdatedPlayerAfterMatch(player, match)).toEqual(expectedPlayer);
    })
  });
});
