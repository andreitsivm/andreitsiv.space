import { useState, useEffect, useMemo } from 'react';

import type { AppProps } from 'next/app';
import {
  ThemeProvider,
  CssBaseline,
  responsiveFontSizes,
  PaletteMode,
} from '@mui/material';
import { deepmerge } from '@mui/utils';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ColorModeContext } from '@/theme/theme-mode';

import { createTheme } from '@mui/material/styles';

import { getDesignTokens, getThemedComponents } from '@/theme/';

export default function App({ Component, pageProps }: AppProps) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<PaletteMode>('dark');
  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  let theme = useMemo(
    () =>
      createTheme(deepmerge(getDesignTokens(mode), getThemedComponents(mode))),
    [mode],
  );
  theme = responsiveFontSizes(theme);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
