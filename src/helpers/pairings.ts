import { Match, Pairing } from "../types/Match";
import { Player } from "../types/Player";
import { applyMatchResultsToPlayers, sortPlayersByMatchPoints } from "./player";

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
 * Gets next round pairings as an array of matches.
 * 
 * @param players Stale players list from state
 * @returns 
 */
 export const getNextRoundPairings = (players: Player[], matches: Match[]): Pairing[] => {
  // Applies match results to the players list.
  const updatedPlayers = applyMatchResultsToPlayers(matches, players);
  // Sorts the players by match points and scrambles within match point tiers.
  const sortedPlayers = sortPlayersByMatchPoints(updatedPlayers);

  return getPairings(sortedPlayers);
 }