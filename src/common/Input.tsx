import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { ReactElement } from 'react';
import styled from '@emotion/styled';

interface InputProps extends InputBaseProps {
  startIcon: ReactElement;
  endIcons: ReactElement;
  setValue: (value: string) => void;
  value: string;
}

const StartIcon = styled.div`
  padding: 10px;
  opacity: 0.54;
`;

export const Input = (props: InputProps) => {
  return (
    <Paper
      component='form'
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <StartIcon>{props.startIcon}</StartIcon>
      <InputBase
        {...props}
        onChange={e => props.setValue(e.target.value)}
        sx={{ ml: 1, flex: 1 }}
        endAdornment={
          props.value.length > 0 && (
            <IconButton
              sx={{ p: '10px' }}
              onClick={() => props.setValue('')}
              disableRipple
            >
              <CancelIcon fontSize='small' />
            </IconButton>
          )
        }
        fullWidth
      />
      {props.endIcons && (
        <>
          <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
          {props.endIcons}
        </>
      )}
    </Paper>
  );
};
