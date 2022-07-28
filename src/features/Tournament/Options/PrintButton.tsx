import Button from '@mui/material/Button';
import PrintIcon from '@mui/icons-material/Print';
import { Link } from '../../../common/Link';

export const PrintButton = () => {
  return (
    <Button component={Link} href={`/pairings`} startIcon={<PrintIcon />}>
      Print pairings
    </Button>
  );
};
