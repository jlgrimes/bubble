import Button from '@mui/material/Button';
import { Link } from '../../../common/Link';

export const PrintButton = () => {
  return (
    <Button component={Link} href={`/pairings`}>
      Print pairings
    </Button>
  );
};
