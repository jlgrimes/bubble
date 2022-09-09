import { TournamentSetupView } from '../TournamentSetupView';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../helpers/test-utils';
import '@testing-library/jest-dom/extend-expect';

describe('Tournament Setup', () => {
  function addMockPlayer(shouldTestThroughEnterKey?: boolean) {
    const addPlayerInput = screen.getByTestId('add-player-input');
    fireEvent.click(addPlayerInput);
    userEvent.type(addPlayerInput, 'Jared');

    if (shouldTestThroughEnterKey) {
      userEvent.type(screen.getByTestId('add-player-input'), '{enter}');
    } else {
      fireEvent.click(screen.getByTestId('add-player-button'));
    }
  }

  describe('add player', () => {
    function testAddPlayer(shouldTestThroughEnterKey?: boolean) {
      renderWithProviders(<TournamentSetupView />);

      expect(screen.queryByTestId('setup-player-1')).not.toBeInTheDocument();

      addMockPlayer(shouldTestThroughEnterKey);

      expect(screen.getByTestId('setup-player-1')).toBeInTheDocument();
      expect(screen.getByTestId('setup-player-1')).toHaveTextContent('Jared');
    }

    it('should add player through plus icon', () => {
      testAddPlayer();
    });

    it('should add player through Enter key', () => {
      testAddPlayer(true);
    });
  });

  describe('edit player', () => {
    it('should open edit by clicking anywhere on the list element', async () => {
      renderWithProviders(<TournamentSetupView />);
      addMockPlayer();

      fireEvent.click(screen.getByTestId('setup-player-1-list-item-button'));
      expect(screen.getByTestId('setup-player-1-editing')).toBeInTheDocument();
    });

    async function openEdit() {
      fireEvent.mouseOver(screen.getByTestId('setup-player-1'));
      await waitFor(() => screen.findByTestId('setup-player-1-edit-button'));

      fireEvent.click(screen.getByTestId('setup-player-1-edit-button'));
    }

    it('should open edit by clicking on edit button', async () => {
      renderWithProviders(<TournamentSetupView />);
      addMockPlayer();
      await openEdit();

      expect(screen.getByTestId('setup-player-1-editing')).toBeInTheDocument();
    });

    async function testEdit(shouldTestThroughEnterKey?: boolean) {
      renderWithProviders(<TournamentSetupView />);
      addMockPlayer();
      await openEdit();

      const editInput = screen.getByTestId('setup-player-1-edit-input');
      userEvent.type(editInput, ' Grimes');

      if (shouldTestThroughEnterKey) {
        userEvent.type(editInput, '{enter}');
      } else {
        fireEvent.click(screen.getByTestId('setup-player-1-save-edit-button'));
      }

      expect(
        screen.queryByTestId('setup-player-1-editing')
      ).not.toBeInTheDocument();
      expect(screen.getByTestId('setup-player-1')).toBeInTheDocument();
      expect(screen.getByTestId('setup-player-1')).toHaveTextContent(
        'Jared Grimes'
      );
    }

    it('should save edit by clicking save', async () => {
      testEdit();
    });

    it('should save edit by hitting Enter key', () => {
      testEdit(true)
    });
  });

  describe('remove player', () => {
    it('should remove player outside editing', async () => {
      renderWithProviders(<TournamentSetupView />);
      addMockPlayer();

      expect(screen.getByTestId('setup-player-1')).toBeInTheDocument();

      fireEvent.mouseOver(screen.getByTestId('setup-player-1'));
      await waitFor(() => screen.findByTestId('setup-player-1-delete-button'));

      fireEvent.click(screen.getByTestId('setup-player-1-delete-button'));
      
    });

    it('should remove player within editing', async () => {
      renderWithProviders(<TournamentSetupView />);
      addMockPlayer();
      addMockPlayer(); // this second one is intentional

      expect(screen.getByTestId('setup-player-1')).toBeInTheDocument();
      expect(screen.getByTestId('setup-player-2')).toBeInTheDocument();

      fireEvent.mouseOver(screen.getByTestId('setup-player-1'));
      await waitFor(() => screen.findByTestId('setup-player-1-edit-button'));

      fireEvent.click(screen.getByTestId('setup-player-1-edit-button'));
      fireEvent.click(screen.getByTestId('setup-player-1-delete-button'));

      // We deleted the first one, so second should not be in the document
      expect(screen.queryByTestId('setup-player-2')).not.toBeInTheDocument();
      // If we delete, we should cancel out of edit.
      expect(screen.getByTestId('setup-player-1')).toBeInTheDocument();
    });
  });
});
