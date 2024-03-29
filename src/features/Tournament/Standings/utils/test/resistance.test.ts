import { calculateResistance } from '../resistance';
import { Player } from '../../../Player/types';
import {
  JARED,
  SAMPLE_SORTED_PLAYER_LIST,
} from '../../../../../helpers/testConstants';

describe('resistance helpers', () => {
  describe('calculateResistance', () => {
    it('should calculate correct resistance for player', () => {
      expect(calculateResistance(JARED, SAMPLE_SORTED_PLAYER_LIST)).toBe(0.25);
    });

    it('should calculate correct resistance with bye', () => {
      const playerWithBye: Player = {
        id: 'Player',
        name: 'Player',
        matches: [
          { opponentId: 'bye', result: 'win' },
          { opponentId: '0', result: 'win' },
        ],
        matchPoints: 6,
        record: {
          wins: 2,
          ties: 0,
          losses: 0
        }
      };

      expect(calculateResistance(playerWithBye, SAMPLE_SORTED_PLAYER_LIST)).toBe(0.5);
    });

    it('should account ties into resistance calculation as 0.5', () => {
      const player: Player = {
        id: 'Player',
        name: 'Player',
        matches: [
          { opponentId: '0', result: 'tie' },
          { opponentId: '1', result: 'win' },
        ],
        matchPoints: 6,
        record: {
          wins: 1,
          ties: 1,
          losses: 0
        }
      };

      expect(calculateResistance(player, SAMPLE_SORTED_PLAYER_LIST)).toBe(0.75);
    });
  });
});
