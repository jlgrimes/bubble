import { Player } from "../../Player/types";

/**
 * Returns a map with a player's updated name.
 * 
 * @param players - List of players.
 * @param playerId - The player's ID to have a name change.
 * @param newName - What we're naming the player to.
 * @returns 
 */
export const updatePlayerName = (players: Player[], playerId: string, newName: string) => {
  return players.map(player => {
    if (player.id === playerId) {
      return {
        ...player,
        name: newName,
      };
    }

    return player;
  });
};

/**
 * Deletes player from list.
 * @param players - List of players.
 * @param playerId - Player ID we want to delete.
 * @returns 
 */
export const deletePlayer = (players: Player[], playerId: string) => {
  return players.filter((player) => player.id !== playerId);
}