import styled from '@emotion/styled';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import { Tooltip } from './Tooltip';
import Button, { ButtonProps } from '@mui/material/Button';
import LoadingButton, { LoadingButtonProps} from '@mui/lab/LoadingButton';

const ButtonWithDisabledTooltipContainer = styled.div`
  display: flex;
  align-items: center;

  .MuiButton-root.Mui-disabled {
    pointer-events: inherit;
  }

  .MuiSvgIcon-root {
    height: 0.75em;
    padding-bottom: 2px;
  }
`;

interface ButtonWithDisabledTooltipProps extends LoadingButtonProps {
  disabledTooltipText: string;
}


export const ButtonWithDisabledTooltip = (props: ButtonWithDisabledTooltipProps) => {
  return (
    <ButtonWithDisabledTooltipContainer>
      <LoadingButton
        {...props}
        loadingPosition='start'
        endIcon={
          props.disabled && (
            <Tooltip
              title={props.disabledTooltipText}
            >
              <HelpOutlineOutlinedIcon />
            </Tooltip>
          )
        }
      >
        {props.children}
      </LoadingButton>
    </ButtonWithDisabledTooltipContainer>
  )
}