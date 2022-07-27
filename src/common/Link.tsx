import MuiLink, { LinkProps } from '@mui/material/Link';

export const Link = (props: LinkProps) => (
  <MuiLink
    {...props}
    target='_blank'
    rel='noreferrer'
    sx={{ textDecoration: 'none' }}
  />
);
