import { styled } from '@mui/material/styles';
import MuiTooltip, {
  TooltipProps,
  tooltipClasses,
} from '@mui/material/Tooltip';

export const Tooltip = styled(({ ...props }: TooltipProps) => (
  <MuiTooltip arrow {...props} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 12.5,
  },
}));
