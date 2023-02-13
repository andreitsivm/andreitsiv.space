import { useContext } from 'react';
import { Button } from '@mui/material';

import Page from '@/components/page';
import { ColorModeContext } from '@/theme/theme-mode';

export default function Home() {
  const { toggleColorMode } = useContext(ColorModeContext);
  return (
    <Page>
      <Button variant='contained' onClick={toggleColorMode}>
        Mode
      </Button>
    </Page>
  );
}
