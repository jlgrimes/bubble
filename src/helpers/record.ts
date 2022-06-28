import { Record } from "../types/Record";

/**
 * Gets number of match points a record is worth.
 * @param record Record object from the player
 * @returns Match points
 */
export const getMatchPoints = (record: Record): number => record.wins * 3 + record.ties;