import { Record } from "../types/Record";
import { MatchResult } from "../types/Match";

export const getUpdatedRecordAfterMatch = (record: Record, result: MatchResult): Record => {
  if (result === 'win') {
    return { ...record, wins: record.wins + 1 };
  }

  if (result === 'loss') {
    return { ...record, losses: record.losses + 1 };
  }

  return { ...record, ties: record.ties + 1 };
}