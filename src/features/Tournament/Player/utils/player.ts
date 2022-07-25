import { v4 as uuidv4 } from 'uuid';

import type { Match } from '../../Pairings/types/Match';
import type { Player, PlayerMatch } from '../types';
import { getMatchPoints, getUpdatedRecordAfterMatch } from './record';
import { inverseResult } from '../../Pairings/utils/match';
import { byePlayer } from '../../state/constants';

export const createPlayer = (name: string): Player => {
  return {
    id: uuidv4(),
    name,
    matches: [],
    record: {
      wins: 0,
      ties: 0,
      losses: 0
    },
    matchPoints: 0
  }
}

export const getActivePlayers = (players: Player[]): Player[] =>
  players.filter(player => !player.dropped);

/**
 * Converts the match object to PlayerMatch, which will be stored in the player object.
 */
export const convertMatchToPlayerMatch = (
  player: Player,
  match: Match
): PlayerMatch => {
  /**
   * If the first player is the player we're talking about, the opponent is the second player, keep the result the same.
   */
  if (player.id === match.playerIds[0]) {
    return {
      opponentId: match.playerIds[1],
      result: match.result === 'double-loss' ? 'loss' : match.result,
    };
  }

  /**
   * If the second player is the player we're talking about, the opponent is the first player, and inverse the match result to store.
   */
  return {
    opponentId: match.playerIds[0],
    result: inverseResult(match.result),
  };
};

export const getUpdatedPlayerAfterMatch = (
  player: Player,
  match: Match | undefined
): Player => {
  // If no match associated with the player, the player must have dropped, so don't modify.
  if (!match) {
    return player;
  }

  const matchResult = convertMatchToPlayerMatch(player, match);
  const newRecord = getUpdatedRecordAfterMatch(
    player.record,
    matchResult.result
  );

  return {
    ...player,
    matches: [...player.matches, matchResult],
    record: newRecord,
    matchPoints: getMatchPoints(newRecord),
  };
};

/**
 * Gets updated players for both players in a match after match results are completed.
 *
 * @param match
 * @param players
 */
export const getUpdatedPlayerPairAfterMatch = (
  match: Match,
  players: Player[]
): Player[] => {
  const firstPlayer: Player | undefined = players.find(
    player => player.id === match.playerIds[0]
  );
  const secondPlayer: Player | undefined = players.find(
    player => player.id === match.playerIds[1]
  );

  let playerPair: Player[] = [];

  if (firstPlayer) {
    playerPair = [
      ...playerPair,
      getUpdatedPlayerAfterMatch(firstPlayer, match),
    ];
  }

  if (secondPlayer) {
    playerPair = [
      ...playerPair,
      getUpdatedPlayerAfterMatch(secondPlayer, match),
    ];
  }

  return playerPair;
};

/**
 * Right after the match is complete and match results are final, applies these match results to the players.
 * @param matchResults
 * @param players
 */
export const applyMatchResultsToPlayers = (
  matches: Match[],
  players: Player[]
): Player[] => {
  return players.map((player: Player) => getUpdatedPlayerAfterMatch(player, matches.find((match) => match.playerIds.includes(player.id))))
};

/**
 * Returns a visually updated player after a match is complete. Used to show players records for completed match.
 *
 * @param player
 * @param existingMatch Match from redux store, if it exists.
 * @returns
 */
export const alterWithCompletedMatch = (
  player: Player,
  existingMatch: Match | undefined
): Player => {
  if (!existingMatch) {
    return player;
  }

  return getUpdatedPlayerAfterMatch(player, existingMatch);
};

export const dropPlayerFromPlayers = (playerId: string, players: Player[]): Player[] => {
  return players.map(player => {
    if (player.id === playerId) {
      return {
        ...player,
        dropped: true,
      };
    }

    return player;
  });
};

export const adjustByePlayer = (players: Player[]): Player[] => {
  // If there's an odd number of players, add the bye player if it doesn't already exist.
  // If the bye player already exists and it's an odd number, remove it before pairing.
  if (getActivePlayers(players).length % 2 !== 0) {
    if (players.some(player => player.id === 'bye')) {
      return players.filter(player => player.id !== 'bye');
    }

    return [...players, byePlayer];
  }

  return players;
}

export const addByeWin = (pairings: string[][], matchResults: Match[]): Match[] => {
  // Pushes bye win
  const lastPairing = pairings[pairings.length - 1];
  if (lastPairing.length === 1 || lastPairing.includes('bye')) {
    return [...matchResults, { playerIds: lastPairing, result: 'win' }]
  }

  return matchResults;
}