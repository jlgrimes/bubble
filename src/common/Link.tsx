import MuiLink, { LinkProps } from '@mui/material/Link';
import React from 'react';

export const Link = React.forwardRef((props: LinkProps, ref) => (
  <MuiLink
    {...props}
    target='_blank'
    rel='noreferrer'
    sx={{ textDecoration: 'none' }}
  />
));
