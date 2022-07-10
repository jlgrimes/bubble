import { inverseResult } from "../match";

describe('match helpers', () => {
  describe('inverse result', () => {
    it('should make a win a loss', () => {
      expect(inverseResult('win')).toBe('loss');
    });

    it('should make a loss a win', () => {
      expect(inverseResult('loss')).toBe('win');
    });

    it('should make a tie a tie', () => {
      expect(inverseResult('tie')).toBe('tie');
    });
  });
});