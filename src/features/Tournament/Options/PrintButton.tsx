import Button from '@mui/material/Button';
import PrintIcon from '@mui/icons-material/Print';
import { Link } from '../../../common/Link';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';

export const PrintButton = () => {
  const printType = useSelector((state: RootState) =>
    state.tournament.viewState === 'standings'
      ? 'standings'
      : 'pairings'
  );
  return (
    <Button component={Link} href={`/print-${printType}`} startIcon={<PrintIcon />}>
      Print
    </Button>
  );
};
