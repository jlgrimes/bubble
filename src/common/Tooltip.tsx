import { styled } from '@mui/material/styles';
import MuiTooltip, {
  TooltipProps,
  tooltipClasses,
} from '@mui/material/Tooltip';

export const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MuiTooltip arrow {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 12.5,
  },
}));
