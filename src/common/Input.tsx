import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import { ReactElement } from 'react';
import styled from '@emotion/styled';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';

interface InputProps extends OutlinedInputProps {
  id: string;
  label: string;
  startIcon?: ReactElement;
  /**
   * If there's a divider between input and end icons
   */
  divider?: boolean;
  endIcons?: ReactElement;
  setValue: (value: string) => void;
  value: string;
  fullWidth?: boolean;
}

const PrettyIcon = styled.div`
  padding: 10px;
  opacity: 0.54;
`;

export const Input = (props: InputProps) => {
  const { startIcon, setValue, divider, ...rest } = props;
  return (
    <FormControl fullWidth={props.fullWidth} sx={{ width: props.fullWidth ? '100%' : '25ch' }} variant="outlined">
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <OutlinedInput
        {...rest}
        onChange={e => setValue(e.target.value)}
      />
    </FormControl>
  );

  // return (
  //   <Paper
  //     sx={{
  //       p: '2px 4px',
  //       display: 'flex',
  //       alignItems: 'center',
  //       width: props.fullWidth ? '100%' : 300,
  //     }}
  //   >
  //     {props.startIcon && <PrettyIcon>{props.startIcon}</PrettyIcon>}
  //     <InputBase
  //       {...props}
  //       onChange={e => props.setValue(e.target.value)}
  //       sx={{ ml: 1, flex: 1 }}
  //       endAdornment={
  //         props.value.length > 0 && (
  //           <IconButton
  //             sx={{ p: '10px' }}
  //             onClick={() => props.setValue('')}
  //             disableRipple
  //           >
  //             <CancelIcon fontSize='small' />
  //           </IconButton>
  //         )
  //       }
  //       fullWidth
  //     />
  //     {props.divider && (
  //       <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
  //     )}
  //     {props.endIcons}
  //   </Paper>
  // );
};
