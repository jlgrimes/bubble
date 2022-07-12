import type { Record } from '../types';
import type { MatchResult } from '../../Pairings/types';

export const getUpdatedRecordAfterMatch = (
  record: Record,
  result: MatchResult
): Record => {
  if (result === 'win') {
    return { ...record, wins: record.wins + 1 };
  }

  if (result === 'loss') {
    return { ...record, losses: record.losses + 1 };
  }

  return { ...record, ties: record.ties + 1 };
};

/**
 * Gets the number of match points a record has.
 * @returns
 */
export const getMatchPoints = (record: Record): number =>
  record.wins * 3 + record.ties;

/**
 * Gets the record as W-L or W-L-T format.
 * @param record
 * @returns Record as a string.
 */
export const getStylizedRecord = (record: Record): string => {
  if (record.ties === 0) {
    return `${record.wins}-${record.losses} (${getMatchPoints(record)})`;
  }

  return `${record.wins}-${record.losses}-${record.ties} (${getMatchPoints(record)})`;
};
