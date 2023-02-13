import * as React from 'react';
import { Button, Box } from '@mui/material';
const pages = ['Products', 'Pricing', 'Blog'];
const DesktopMenu: React.FC = () => {
  return (
    <>
      {' '}
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {pages.map(page => (
          <Button key={page} sx={{ my: 2, color: 'white', display: 'block' }}>
            {page}
          </Button>
        ))}
      </Box>
    </>
  );
};

export default DesktopMenu;
