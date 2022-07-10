import { Match, PlayerMatch } from '../../types/Match';
import { Player } from '../../types/Player';
import {
  convertMatchToPlayerMatch,
  getUpdatedPlayerAfterMatch,
  chunkSortedArrayByMatchPoints,
  shuffleAndFlattenChunkedPlayersByMatchPoints,
  sortPlayersByMatchPoints,
  applyMatchResultsToPlayers,
  getUpdatedPlayerPairAfterMatch,
} from '../player';
import { shuffle } from '../shuffle';
import {
  JARED,
  RYAN,
  KENNY,
  NOAH,
  SAMPLE_PLAYER,
  SAMPLE_SORTED_PLAYER_LIST,
  SAMPLE_MATCH_RESULTS,
} from './shared';

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

  describe('chunkSortedArrayByMatchPoints', () => {
    it('should return empty array if no players', () => {
      expect(chunkSortedArrayByMatchPoints([])).toEqual([]);
    });

    it('should chunk array by match points', () => {
      expect(
        chunkSortedArrayByMatchPoints(SAMPLE_SORTED_PLAYER_LIST)
      ).toMatchSnapshot();
    });
  });

  describe('shuffleAndFlattenChunkedPlayersByMatchPoints', () => {
    it('should shuffle and flatten chunkedPlayerIdxs', () => {
      const chunk = [[0], [1, 2], [3]];
      expect([
        [0, 1, 2, 3],
        [0, 2, 1, 3],
      ]).toContainEqual(shuffleAndFlattenChunkedPlayersByMatchPoints(chunk));
    });
  });

  describe('sortPlayersByMatchPoints', () => {
    it('should sort and shuffle players by their match points', () => {
      const scrambledList = shuffle(SAMPLE_SORTED_PLAYER_LIST);
      expect([
        [JARED, NOAH, RYAN, KENNY],
        [JARED, RYAN, NOAH, KENNY],
      ]).toContainEqual(sortPlayersByMatchPoints(scrambledList));
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
