import { Match, PlayerMatch } from "../types/Match";
import { Player } from "../types/Player";
import { getMatchPoints, getUpdatedRecordAfterMatch } from "./record";
import { inverseResult } from "./match";
import { shuffle } from "./shuffle";

export const getActivePlayers = (players: Player[]): Player[] => players.filter(player => !player.dropped);

/**
 * Converts the match object to PlayerMatch, which will be stored in the player object.
 */
export const convertMatchToPlayerMatch = (player: Player, match: Match): PlayerMatch => {
  /**
   * If the first player is the player we're talking about, the opponent is the second player, keep the result the same.
   */
  if (player.id === match.playerIds[0] ) {
    return {
      opponentId: match.playerIds[1],
      result: match.result
    };
  }

  /**
   * If the second player is the player we're talking about, the opponent is the first player, and inverse the match result to store.
   */
  return {
    opponentId: match.playerIds[0],
    result: inverseResult(match.result)
  };
};

export const getUpdatedPlayerAfterMatch = (player: Player, match: Match): Player => {
  const matchResult = convertMatchToPlayerMatch(player, match);
  const newRecord = getUpdatedRecordAfterMatch(player.record, matchResult.result);

  return {
    ...player,
    matches: [...player.matches, matchResult],
    record: newRecord,
    matchPoints: getMatchPoints(newRecord)
  }
}

/**
 * Chunks the players array by match points. Needed to scramble match point tiers for pairings.
 * 
 * @param players Players array
 * @returns Chunked array of player indexes from original player array.
 */
 export const chunkSortedArrayByMatchPoints = (players: Player[]): number[][] => {
  if (players.length === 0) {
    return [];
  }

  // Stores a list of player ids to be mapped to players
  let resultingIdArray: number[][] = [];
  // Stores player ids
  let chunk: number[] = [];
  let chunkMatchPoints: number = players[0].matchPoints;

  for (let playerIdx = 0; playerIdx < players.length; playerIdx++) {
    const player = players[playerIdx];

    if (player.matchPoints === chunkMatchPoints) {
      chunk.push(playerIdx);
    } else {
      resultingIdArray.push(chunk);

      // if we're at the end of the players array and the match point is different, push it as its own entity.
      if (playerIdx === players.length - 1) {
        resultingIdArray.push([playerIdx])
      } else {
        chunkMatchPoints = player.matchPoints;
        chunk = [playerIdx];
      }
    }
  }

  return resultingIdArray;
};

/**
 * Shuffles and flattens the list of player idxs. The result is the players array with all match points sorted.
 * 
 * @param chunkedPlayerIdxs Result from chunkSortedArrayByMatchPoints
 * @returns Flattened array with shuffled player idxs.
 */
export const shuffleAndFlattenChunkedPlayersByMatchPoints = (chunkedPlayerIdxs: number[][]): number[] => {
  return chunkedPlayerIdxs.reduce((acc, chunk) => {
    return [...acc, ...shuffle(chunk)]
  }, [])
};

export const sortPlayersByMatchPoints = (players: Player[]): Player[] => {
  // Players who aren't dropped. Don't pair players who are dropped.
  players = getActivePlayers(players);
  // Sort the players top to bottom by match points.
  players.sort((a, b) => b.matchPoints - a.matchPoints);
  // Get players array chunked by match points.
  const chunkedPlayerIdxs: number[][] = chunkSortedArrayByMatchPoints(players);
  // Shuffle and flatten player idxs
  const shuffledAndFlattenedPlayerIdxs = shuffleAndFlattenChunkedPlayersByMatchPoints(chunkedPlayerIdxs);

  const result = shuffledAndFlattenedPlayerIdxs.map((playerIdx) => players[playerIdx]);
  return result;
};