import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export function addMockPlayer(shouldTestThroughEnterKey?: boolean) {
  const addPlayerInput = screen.getByRole('textbox', { name: 'Add player'});
  fireEvent.click(addPlayerInput);
  userEvent.type(addPlayerInput, 'Jared');

  if (shouldTestThroughEnterKey) {
    userEvent.type(addPlayerInput, '{enter}');
  } else {
    fireEvent.click(screen.getByRole('button', { name: 'Add player button'}));
  }
}

export function addMockPlayerNTimes(n: number) {
  for (const _ in [...Array(n)]) {
    addMockPlayer();
  }
}