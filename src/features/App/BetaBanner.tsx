import Alert from '@mui/material/Alert';
import { Link } from '../../common/Link';

export const BetaBanner = () => {
  const text = `
    Thanks for trying out bubble!
  `;
  return (
    <Alert severity='info'>
      Thanks for trying out bubble! If you have any feedback or notice any bugs,
      please first look to see if it's on the{' '}
      <Link href='https://hyper-cheese-c14.notion.site/0411a7a8047d4b20985e8d80327a4152?v=6dc626c5ee1641df9ba3b345eb54bb36'>
        known issues page
      </Link>
      . If not, report{' '}
      <Link href='https://notionforms.io/forms/feedback-59'>
        through this form
      </Link>
      .
    </Alert>
  );
};
