import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ButtonWithConfirmationModalProps extends ButtonProps {
  onClick: () => void;
  modalTitle: string;
  modalContent: string;
}

export const ButtonWithConfirmationModal = (props: ButtonWithConfirmationModalProps) => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleDismiss = () => setModalOpen(false);
  const handleConfirm = () => {
    props.onClick();
    setModalOpen(false);
  };

  return (
    <>
      <Button
        {...props}
        onClick={() => setModalOpen(true)}
      >
        {props.children}
      </Button>
      <Dialog
        open={modalOpen}
        onClose={handleDismiss}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {props.modalTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {props.modalContent}
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
    </>
  )
}