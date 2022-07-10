import type { Record } from "../types";
import type { MatchResult } from "../../Pairings/types";

export const getUpdatedRecordAfterMatch = (record: Record, result: MatchResult): Record => {
  if (result === 'win') {
    return { ...record, wins: record.wins + 1 };
  }

  if (result === 'loss') {
    return { ...record, losses: record.losses + 1 };
  }

  return { ...record, ties: record.ties + 1 };
}

/**
 * Gets the number of match points a record has.
 * @returns 
 */
 export const getMatchPoints = (record: Record): number => record.wins * 3 + record.ties;