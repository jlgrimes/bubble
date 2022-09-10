import styled from '@emotion/styled';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Tooltip } from './Tooltip';
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
  const { disabledTooltipText, ...rest } = props;

  return (
    <ButtonWithDisabledTooltipContainer>
      <LoadingButton
        {...rest}
        endIcon={
          props.disabled && (
            <Tooltip
              title={disabledTooltipText}
            >
              <InfoOutlinedIcon />
            </Tooltip>
          )
        }
      >
        {props.children}
      </LoadingButton>
    </ButtonWithDisabledTooltipContainer>
  )
}