import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type { Match } from './types';
import { useDispatch } from 'react-redux';
import { unsubmitMatchResult } from '../state/tournamentSlice';

interface PairingRepairConfirmationModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  match: Match;
}

export const PairingRepairConfirmationModal = (
  props: PairingRepairConfirmationModalProps
) => {
  const dispatch = useDispatch();

  const handleDismiss = () => props.setOpen(false);
  const handleConfirm = () => {
    dispatch(unsubmitMatchResult(props.match));
    props.setOpen(false);
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleDismiss}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        Are you sure you want to unsubmit?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Repairing should only be done if match results are incorrectly
          submitted.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button aria-label='No' onClick={handleDismiss}>
          No
        </Button>
        <Button aria-label='Yes' onClick={handleConfirm} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
