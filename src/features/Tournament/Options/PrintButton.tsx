import Button from '@mui/material/Button';
import { Link } from '../../../common/Link';

interface PrintButtonProps {
  pairingsId: string;
}

export const PrintButton = (props: PrintButtonProps) => {
  return (
    <Button component={Link} href={`/pairings/${props.pairingsId}`}>
      Print pairings
    </Button>
  );
};
