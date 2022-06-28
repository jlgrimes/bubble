import { Player } from "../types/Player";

export const getActivePlayers = (players: Player[]): Player[] => players.filter(player => !player.dropped);