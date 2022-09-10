import { TournamentSetupView } from '../TournamentSetupView';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../helpers/test-utils';
import '@testing-library/jest-dom/extend-expect';
import { addMockPlayerNTimes } from './utils';

describe('Tournament options', () => {
  describe('manual options error messages', () => {
    it('should warn and not allow save if rounds are more than recommended', () => {
      renderWithProviders(<TournamentSetupView />);

      fireEvent.click(
        screen.getByRole('button', { name: 'Edit tournament button' })
      );
      fireEvent.click(
        screen.getByRole('checkbox', {
          name: 'Let Bubble decide rounds for me',
        })
      );

      fireEvent.change(
        screen.getByRole('spinbutton', { name: 'Number of rounds input' }),
        { target: { value: '2' } }
      );
      expect(screen.getByRole('button', { name: 'Save changes' })).toBeDisabled();
    });

    it('should warn and not allow save if top cut is more than recommended', () => {
      renderWithProviders(<TournamentSetupView />);

      fireEvent.click(
        screen.getByRole('button', { name: 'Edit tournament button' })
      );
      fireEvent.click(
        screen.getByRole('checkbox', {
          name: 'Let Bubble decide rounds for me',
        })
      );
      fireEvent.click(screen.getByRole('radio', { name: 'Top four' }));
      expect(screen.getByRole('button', { name: 'Save changes' })).toBeDisabled();
    });
  });

  describe('setup page checks', () => {
    it('should display recommended rounds and top cut by default', () => {
      renderWithProviders(<TournamentSetupView />);
      addMockPlayerNTimes(9);

      expect(screen.getByText('4 rounds, top 4 cut')).toBeInTheDocument();

      fireEvent.click(
        screen.getByRole('button', { name: 'Edit tournament button' })
      );
      expect(
        screen.getByRole('checkbox', {
          name: 'Let Bubble decide rounds for me',
        })
      ).toBeChecked();
    });

    it('should display custom message if recommended checkbox is unchecked', () => {
      renderWithProviders(<TournamentSetupView />);

      fireEvent.click(
        screen.getByRole('button', { name: 'Edit tournament button' })
      );
      fireEvent.click(
        screen.getByRole('checkbox', {
          name: 'Let Bubble decide rounds for me',
        })
      );
      fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));

      expect(
        screen.getByRole('heading', { name: 'Custom' })
      ).toBeInTheDocument();
    });

    it('should not update rounds or top cut as adding players if recommended checkbox is unchecked', () => {
      renderWithProviders(<TournamentSetupView />);

      fireEvent.click(
        screen.getByRole('button', { name: 'Edit tournament button' })
      );
      fireEvent.click(
        screen.getByRole('checkbox', {
          name: 'Let Bubble decide rounds for me',
        })
      );
      fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));

      addMockPlayerNTimes(9);

      expect(screen.getByText('1 round, no top cut')).toBeInTheDocument();
    });

    it('should revert to recommended rounds if recommended checkbox is re-clicked', () => {
      renderWithProviders(<TournamentSetupView />);

      fireEvent.click(
        screen.getByRole('button', { name: 'Edit tournament button' })
      );
      fireEvent.click(
        screen.getByRole('checkbox', {
          name: 'Let Bubble decide rounds for me',
        })
      );
      fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));

      addMockPlayerNTimes(9);
      fireEvent.click(
        screen.getByRole('button', { name: 'Edit tournament button' })
      );
      // Checkbox state should be persisted from modal closing and opening.
      expect(
        screen.getByRole('checkbox', {
          name: 'Let Bubble decide rounds for me',
        })
      ).not.toBeChecked();

      fireEvent.click(
        screen.getByRole('checkbox', {
          name: 'Let Bubble decide rounds for me',
        })
      );
      fireEvent.click(screen.getByRole('button', { name: 'Save changes' }));

      expect(screen.getByText('4 rounds, top 4 cut')).toBeInTheDocument();
    });
  });
});
