import styled from '@emotion/styled';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Tooltip from '@mui/material/Tooltip';
import Button, { ButtonProps } from '@mui/material/Button';

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

interface ButtonWithDisabledTooltipProps extends ButtonProps {
  disabledTooltipText: string;
}


export const ButtonWithDisabledTooltip = (props: ButtonWithDisabledTooltipProps) => {
  return (
    <ButtonWithDisabledTooltipContainer>
      <Button
        {...props}
        endIcon={
          props.disabled && (
            <Tooltip
              arrow
              title={props.disabledTooltipText}
              style={{fontSize: '16px'}}
            >
              <HelpOutlineOutlinedIcon />
            </Tooltip>
          )
        }
      >
        {props.children}
      </Button>
    </ButtonWithDisabledTooltipContainer>
  )
}