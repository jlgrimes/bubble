import { Match } from '../../../Pairings/types';
import { Player, PlayerMatch } from '../../../Player/types';
import {
  convertMatchToPlayerMatch,
  getUpdatedPlayerAfterMatch,
  applyMatchResultsToPlayers,
  getUpdatedPlayerPairAfterMatch,
} from '../player';
import {
  SAMPLE_PLAYER,
  SAMPLE_SORTED_PLAYER_LIST,
  SAMPLE_MATCH_RESULTS,
} from '../../../../../helpers/testConstants';

describe('player helpers', () => {
  describe('convertMatchToPlayerMatch', () => {
    it('should preserve match result if player is listed first', () => {
      const match: Match = { result: 'win', playerIds: ['0', '4'] };
      const expectedPlayerMatch: PlayerMatch = {
        opponentId: '4',
        result: 'win',
      };

      expect(convertMatchToPlayerMatch(SAMPLE_PLAYER, match)).toEqual(
        expectedPlayerMatch
      );
    });

    it('should inverse match result if player is listed second', () => {
      const match: Match = { result: 'win', playerIds: ['4', '0'] };
      const expectedPlayerMatch: PlayerMatch = {
        opponentId: '4',
        result: 'loss',
      };

      expect(convertMatchToPlayerMatch(SAMPLE_PLAYER, match)).toEqual(
        expectedPlayerMatch
      );
    });
  });

  describe('getUpdatedPlayerAfterMatch', () => {
    it('should get correct player after match', () => {
      const match: Match = { result: 'win', playerIds: ['0', '4'] };
      const expectedPlayerMatch: PlayerMatch = {
        opponentId: '4',
        result: 'win',
      };
      const expectedPlayer: Player = {
        ...SAMPLE_PLAYER,
        matches: [...SAMPLE_PLAYER.matches, expectedPlayerMatch],
        record: {
          wins: 2,
          ties: 1,
          losses: 1,
        },
        matchPoints: 7,
      };

      expect(getUpdatedPlayerAfterMatch(SAMPLE_PLAYER, match)).toEqual(
        expectedPlayer
      );
    });
  });

  describe('getUpdatedPlayerPairAfterMatch', () => {
    it('should get updated player pair for defined players', () => {
      expect(getUpdatedPlayerPairAfterMatch(SAMPLE_MATCH_RESULTS[0], SAMPLE_SORTED_PLAYER_LIST)).toMatchSnapshot();
    });
  });
  
  describe('applyMatchResultsToPlayers', () => {
    it('should apply match results to players', () => {
      expect(
        applyMatchResultsToPlayers(
          SAMPLE_MATCH_RESULTS,
          SAMPLE_SORTED_PLAYER_LIST
        )
      ).toMatchSnapshot();
    });
  });
});
