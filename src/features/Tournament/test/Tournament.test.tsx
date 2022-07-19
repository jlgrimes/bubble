import { Tournament } from '../Tournament';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../helpers/test-utils';
import {
  generateEmptyPlayers,
  SAMPLE_PAIRINGS,
  SAMPLE_SORTED_PLAYER_LIST,
} from '../../../helpers/testConstants';
import { getPairings } from '../Pairings/utils/pairings';

describe('Tournament', () => {
  describe('match result actions', () => {
    it('should reflect on UI when win is assigned', () => {
      renderWithProviders(<Tournament />, {
        preloadedState: {
          tournament: {
            round: 0,
            pairings: SAMPLE_PAIRINGS,
            players: SAMPLE_SORTED_PLAYER_LIST,
            matchResults: [],
            maxRounds: 5,
            topCut: undefined
          },
        },
      });

      expect(screen.getByLabelText('Jared').textContent).toBe('Jared2-0 (6)');
      expect(screen.getByLabelText('Noah').textContent).toBe('Noah1-1 (3)');

      fireEvent.click(screen.getByLabelText('Jared'));
      fireEvent.click(screen.getByLabelText('Mark win'));

      expect(screen.getByLabelText('Jared').textContent).toBe('Jared3-0 (9)');
      expect(screen.getByLabelText('Noah').textContent).toBe('Noah1-2 (3)');
    });

    it('should reflect on UI when tie is assigned', () => {
      renderWithProviders(<Tournament />, {
        preloadedState: {
          tournament: {
            round: 0,
            pairings: SAMPLE_PAIRINGS,
            players: SAMPLE_SORTED_PLAYER_LIST,
            matchResults: [],
            maxRounds: 5,
            topCut: undefined
          },
        },
      });

      fireEvent.click(screen.getByLabelText('Jared'));
      fireEvent.click(screen.getByLabelText('Mark tie'));

      expect(screen.getByLabelText('Jared').textContent).toBe('Jared2-0-1 (7)');
      expect(screen.getByLabelText('Noah').textContent).toBe('Noah1-1-1 (4)');
    });

    it('should reflect on UI when double game loss is assigned', () => {
      renderWithProviders(<Tournament />, {
        preloadedState: {
          tournament: {
            round: 0,
            pairings: SAMPLE_PAIRINGS,
            players: SAMPLE_SORTED_PLAYER_LIST,
            matchResults: [],
            maxRounds: 5,
            topCut: undefined
          },
        },
      });

      fireEvent.click(screen.getByLabelText('Jared'));
      fireEvent.click(screen.getByLabelText('Mark double game loss'));

      expect(screen.getByLabelText('Jared').textContent).toBe('Jared2-1 (6)');
      expect(screen.getByLabelText('Noah').textContent).toBe('Noah1-2 (3)');
    });

    it('should reset pairing when pairing is unsubmitted', () => {
      renderWithProviders(<Tournament />, {
        preloadedState: {
          tournament: {
            round: 0,
            pairings: SAMPLE_PAIRINGS,
            players: SAMPLE_SORTED_PLAYER_LIST,
            matchResults: [],
            maxRounds: 5,
            topCut: undefined
          },
        },
      });

      expect(screen.getByLabelText('Jared').textContent).toBe('Jared2-0 (6)');
      expect(screen.getByLabelText('Noah').textContent).toBe('Noah1-1 (3)');

      fireEvent.click(screen.getByLabelText('Jared'));
      fireEvent.click(screen.getByLabelText('Mark win'));

      expect(screen.getByLabelText('Jared').textContent).toBe('Jared3-0 (9)');
      expect(screen.getByLabelText('Noah').textContent).toBe('Noah1-2 (3)');

      fireEvent.click(screen.getByLabelText('Jared'));
      fireEvent.click(screen.getByLabelText('Unsubmit match result'));
      fireEvent.click(screen.getByLabelText('Yes'));

      expect(screen.getByLabelText('Jared').textContent).toBe('Jared2-0 (6)');
      expect(screen.getByLabelText('Noah').textContent).toBe('Noah1-1 (3)');
    });
  });

  describe('round pairings', () => {
    it('should pair players who won together, lost together', () => {
      const players = generateEmptyPlayers(4);

      renderWithProviders(<Tournament />, {
        preloadedState: {
          tournament: {
            round: 0,
            pairings: getPairings(players, false),
            players: players,
            matchResults: [],
            maxRounds: 5,
            topCut: undefined
          },
        },
      });

      fireEvent.click(screen.getByLabelText('Player 0'));
      fireEvent.click(screen.getByLabelText('Mark win'));

      fireEvent.click(screen.getByLabelText('Player 2'));
      fireEvent.click(screen.getByLabelText('Mark win'));

      fireEvent.click(screen.getByLabelText('Generate next round pairings'));

      expect(screen.getByLabelText('Table 1 pairings').textContent).toBe('Player 01-0 (3)Table 1Player 21-0 (3)');
      expect(screen.getByLabelText('Table 2 pairings').textContent).toBe('Player 10-1 (0)Table 2Player 30-1 (0)');
    });
  });
});
