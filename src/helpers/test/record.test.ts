import { getUpdatedRecordAfterMatch } from "../record";

describe('record helpers', () => {
  describe('getUpdatedRecordAfterMatch', () => {
    const record = {
      wins: 1,
      ties: 1,
      losses: 1
    };
  
    it('should add a win if result is a win', () => {
      expect(getUpdatedRecordAfterMatch(record, 'win')).toEqual({
        wins: 2,
        ties: 1,
        losses: 1
      });
    });

    it('should add a tie if result is a tie', () => {
      expect(getUpdatedRecordAfterMatch(record, 'tie')).toEqual({
        wins: 1,
        ties: 2,
        losses: 1
      });
    });

    it('should add a loss if result is a loss', () => {
      expect(getUpdatedRecordAfterMatch(record, 'loss')).toEqual({
        wins: 1,
        ties: 1,
        losses: 2
      });
    });
  });
});