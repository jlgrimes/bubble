import { Tournament } from '../Tournament';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../helpers/test-utils';
import {
  generateEmptyPlayers,
  SAMPLE_PAIRINGS,
  SAMPLE_SORTED_PLAYER_LIST,
} from '../../../helpers/testConstants';
import { ViewState } from '../state/ViewState';
import { TopCutType } from '../state/TournamentState';
import { PLAYERS_AFTER_ROUNDS } from '../../../helpers/long-constants';

const markWin = (playerName: string) => {
  fireEvent.click(screen.getByLabelText(playerName));
  fireEvent.click(screen.getByLabelText(`Mark win ${playerName}`));
};

describe('Tournament', () => {
  const preloadedState = {
    tournament: {
      round: 0,
      pairings: SAMPLE_PAIRINGS,
      players: SAMPLE_SORTED_PLAYER_LIST,
      matchResults: [],
      maxRounds: 5,
      topCut: undefined,
      viewState: 'tournament' as ViewState,
      deterministicPairing: true,
    },
  };
  describe('match result actions', () => {
    it('should reflect on UI when win is assigned', () => {
      renderWithProviders(<Tournament />, {
        preloadedState,
      });

      expect(screen.getByLabelText('Jared').textContent).toBe('Jared2-0 (6)');
      expect(screen.getByLabelText('Noah').textContent).toBe('Noah1-1 (3)');

      markWin('Jared');

      expect(screen.getByLabelText('Jared').textContent).toBe('Jared3-0 (9)');
      expect(screen.getByLabelText('Noah').textContent).toBe('Noah1-2 (3)');
    });

    it('should reflect on UI when tie is assigned', () => {
      renderWithProviders(<Tournament />, {
        preloadedState,
      });

      fireEvent.click(screen.getByLabelText('Jared'));
      fireEvent.click(screen.getByLabelText('Mark tie'));

      expect(screen.getByLabelText('Jared').textContent).toBe('Jared2-0-1 (7)');
      expect(screen.getByLabelText('Noah').textContent).toBe('Noah1-1-1 (4)');
    });

    it('should reflect on UI when double game loss is assigned', () => {
      renderWithProviders(<Tournament />, {
        preloadedState,
      });

      fireEvent.click(screen.getByLabelText('Jared'));
      fireEvent.click(screen.getByLabelText('Mark double game loss'));

      expect(screen.getByLabelText('Jared').textContent).toBe('Jared2-1 (6)');
      expect(screen.getByLabelText('Noah').textContent).toBe('Noah1-2 (3)');
    });

    it('should reset pairing when pairing is unsubmitted', () => {
      renderWithProviders(<Tournament />, {
        preloadedState,
      });

      expect(screen.getByLabelText('Jared').textContent).toBe('Jared2-0 (6)');
      expect(screen.getByLabelText('Noah').textContent).toBe('Noah1-1 (3)');

      markWin('Jared');

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
          ...preloadedState,
          tournament: {
            ...preloadedState.tournament,
            players,
          },
        },
      });
      markWin('Player 0');
      markWin('Player 2');

      fireEvent.click(screen.getByLabelText('Generate next round pairings'));

      expect(screen.getByLabelText('Table 1 pairings').textContent).toBe(
        'Player 01-0 (3)Table 1Player 21-0 (3)'
      );
      expect(screen.getByLabelText('Table 2 pairings').textContent).toBe(
        'Player 10-1 (0)Table 2Player 30-1 (0)'
      );
    });
  });

  describe('top cut', () => {
    it('should correctly pair and run top 8 of cut', () => {
      const standingsState = {
        tournament: {
          round: 6,
          pairings: [],
          players: PLAYERS_AFTER_ROUNDS,
          standings: [],
          matchResults: [],
          maxRounds: 6,
          topCut: 'top-eight' as TopCutType,
          viewState: 'standings' as ViewState,
          deterministicPairing: true,
        },
      };

      renderWithProviders(<Tournament />, {
        preloadedState: standingsState,
      });

      fireEvent.click(screen.getByLabelText('Enter top cut'));
      expect(screen.getByLabelText('Table 1 pairings').textContent).toBe(
        'Player 466-0 (18)Table 1Player 354-2 (12)'
      );
      expect(screen.getByLabelText('Table 2 pairings').textContent).toBe(
        'Player 405-1 (15)Table 2Player 344-2 (12)'
      );
      expect(screen.getByLabelText('Table 3 pairings').textContent).toBe(
        'Player 395-1 (15)Table 3Player 415-1 (15)'
      );
      expect(screen.getByLabelText('Table 4 pairings').textContent).toBe(
        'Player 445-1 (15)Table 4Player 325-1 (15)'
      );

      markWin('Player 46');
      markWin('Player 40');
      markWin('Player 39');
      markWin('Player 44');

      fireEvent.click(screen.getByLabelText('Generate next round pairings'));

      expect(screen.getByLabelText('Table 1 pairings').textContent).toBe(
        'Player 467-0 (21)Table 1Player 446-1 (18)'
      );
      expect(screen.getByLabelText('Table 2 pairings').textContent).toBe(
        'Player 406-1 (18)Table 2Player 396-1 (18)'
      );

      markWin('Player 46');
      markWin('Player 40');

      fireEvent.click(screen.getByLabelText('Generate next round pairings'));

      expect(screen.getByLabelText('Table 1 pairings').textContent).toBe(
        'Player 468-0 (24)Table 1Player 407-1 (21)'
      );

      fireEvent.click(screen.getByLabelText('Generate next round pairings'));

      // Test for standings
    });
  });
});
