import { TournamentSetupView } from '../TournamentSetupView';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../helpers/test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('Tournament options', () => {
  describe('user interface checks', () => {
    it('should display custom message if recommended checkbox is unchecked', () => {
      renderWithProviders(<TournamentSetupView />);
      fireEvent.click(screen.getByRole('button', { name: 'Edit tournament button'}));
      fireEvent.click(screen.getByRole('checkbox', { name: 'Let Bubble decide rounds for me' }));
      fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));
      
      expect(screen.getByRole('heading', { name: 'Custom' })).toBeInTheDocument();
    });
  });
});
