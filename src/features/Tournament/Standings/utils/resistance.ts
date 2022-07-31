import { Player, PlayerMatch } from "../../Player/types";

export const getWinPercentage = (player: Player | undefined): number => {
  if (!player || player.id === 'bye') {
    return 0;
  }

  const wins: number = player.matches.filter((match: PlayerMatch) => match.result === 'win').length;
  const ties: number = player.matches.filter((match: PlayerMatch) => match.result === 'tie').length

  return (wins + ties * 0.5) / player.matches.length
}

export const calculateResistance = (player: Player | undefined, players: Player[]): number => {
  if (!player) {
    return 0;
  }

  let resistance: number = 0;

  for (const { opponentId } of player.matches) {
    resistance += getWinPercentage(players.find((player) => player.id === opponentId))
  }

  return resistance / player.matches.length;
};

export const getStylizedPercentage = (num: number): string => `${(num * 100).toFixed(2)}%`;

export const calculateOpponentOpponentWinRate = (player: Player, players: Player[]): number => {
  let opponentOpponentWinRate: number = 0;

  for (const { opponentId } of player.matches) {
    opponentOpponentWinRate += calculateResistance(players.find((player) => player.id === opponentId), players)
  }

  return opponentOpponentWinRate / player.matches.length;
}