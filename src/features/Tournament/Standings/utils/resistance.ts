import { Player, PlayerMatch } from "../../Player/types";

export const getWinPercentage = (player: Player | undefined): number => {
  if (!player || player.id === 'bye') {
    return 0;
  }

  return player.matches.filter((match: PlayerMatch) => match.result === 'win').length / player.matches.length
}

export const calculateResistance = (player: Player, players: Player[]): number => {
  let resistance: number = 0;

  for (const { opponentId } of player.matches) {
    resistance += getWinPercentage(players.find((player) => player.id === opponentId))
  }

  return resistance / player.matches.length;
};