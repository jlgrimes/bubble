import type { Match, Pairing } from "../types";
import type { Player } from "../../Player/types/Player";
import { applyMatchResultsToPlayers, sortPlayersByMatchPoints } from "../../Player/utils/player";
import { shuffle } from "../../../../helpers/shuffle";

/**
 * Gets pairings from a list of players. Top-down.
 * 
 * @param players Top-down sorted list of players.
 * @returns Pairings list.
 */
export const getPairings = (players: Player[]): Pairing[] => {
  let pairings: Pairing[] = [];
  for (let playerIdx = 0; playerIdx < players.length; playerIdx += 2) {
    if (playerIdx === players.length - 1) {
      pairings.push({ playerIds: [players[playerIdx].id] });
    } else {
      pairings.push({ playerIds: [players[playerIdx].id, players[playerIdx + 1].id] });
    }
  }

  return pairings;
}

/**
 * Gets initial round pairings as an array of matches.
 * 
 * @param players Players list.
 * @returns 
 */
export const getInitialRoundPairings = (players: Player[]): Pairing[] => {
  // Initial round doesn't need to organize by match points.
  const sortedPlayers = shuffle(players);

  return getPairings(sortedPlayers);
};

/**
 * Gets next round pairings as an array of pairings.
 * 
 * @param players Stale players list from state.
 * @returns 
 */
 export const getNextRoundPairings = (players: Player[], matches: Match[]): Pairing[] => {
  // Applies match results to the players list.
  const updatedPlayers = applyMatchResultsToPlayers(matches, players);
  // Sorts the players by match points and scrambles within match point tiers.
  const sortedPlayers = sortPlayersByMatchPoints(updatedPlayers);

  return getPairings(sortedPlayers);
 }