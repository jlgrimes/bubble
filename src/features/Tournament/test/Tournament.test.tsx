import Tournament from '../Tournament';
import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '../../../helpers/test-utils';
import { SAMPLE_PAIRINGS, SAMPLE_SORTED_PLAYER_LIST } from '../../../helpers/testConstants'

describe('Tournament', () => {
  it('should reflect on UI when win is assigned', () => {
    renderWithProviders(<Tournament />, { preloadedState: {
      tournament: {
        round: 0,
        pairings: SAMPLE_PAIRINGS,
        players: SAMPLE_SORTED_PLAYER_LIST,
        matchResults: [],
      }
    }})
    
    expect(screen.getByLabelText('Jared').textContent).toBe('Jared2-0 (6)');
    expect(screen.getByLabelText('Noah').textContent).toBe('Noah1-1 (3)');

    fireEvent.click(screen.getByLabelText('Jared'));
    fireEvent.click(screen.getByLabelText('Mark win'));

    expect(screen.getByLabelText('Jared').textContent).toBe('Jared3-0 (9)')
    expect(screen.getByLabelText('Noah').textContent).toBe('Noah1-2 (3)');
  });
});