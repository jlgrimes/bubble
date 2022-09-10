import { TournamentSetupView } from '../TournamentSetupView';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../helpers/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { addMockPlayerNTimes } from './utils';

describe('Tournament options', () => {
  describe('setup page checks', () => {
    it('should display recommended rounds and top cut by default', () => {
      renderWithProviders(<TournamentSetupView />);
      addMockPlayerNTimes(9);

      expect(screen.getByText('4 rounds, top 4 cut')).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'Edit tournament button'}));
      expect(screen.getByRole('checkbox', { name: 'Let Bubble decide rounds for me' })).toBeChecked();
    });

    it('should display custom message if recommended checkbox is unchecked', () => {
      renderWithProviders(<TournamentSetupView />);

      fireEvent.click(screen.getByRole('button', { name: 'Edit tournament button'}));
      fireEvent.click(screen.getByRole('checkbox', { name: 'Let Bubble decide rounds for me' }));
      fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
      
      expect(screen.getByRole('heading', { name: 'Custom' })).toBeInTheDocument();
    });

    it('should not update rounds as adding players if recommended checkbox is unchecked', () => {
      renderWithProviders(<TournamentSetupView />);
      
      fireEvent.click(screen.getByRole('button', { name: 'Edit tournament button'}));
      fireEvent.click(screen.getByRole('checkbox', { name: 'Let Bubble decide rounds for me' }));
      fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));

      addMockPlayerNTimes(3);

      expect(screen.getByText('1 round, no top cut')).toBeInTheDocument();
    });

    it('should revert to recommended rounds if recommended checkbox is re-clicked', () => {
      renderWithProviders(<TournamentSetupView />);

      fireEvent.click(screen.getByRole('button', { name: 'Edit tournament button'}));
      fireEvent.click(screen.getByRole('checkbox', { name: 'Let Bubble decide rounds for me' }));
      fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));

      addMockPlayerNTimes(3);
    });
  });
});
