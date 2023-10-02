"use client";
import { useState, useMemo, createContext, useContext } from 'react';
import { createTheme, ThemeProvider, CssBaseline, PaletteMode } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const getDesignTokens = (mode : any) => {
  return {
    palette: {
      mode,
    },
  };
};

const ThemeContext = createContext('light');

const lightTheme = createTheme(getDesignTokens('light'));

const darkTheme = createTheme(getDesignTokens('dark'));

const ThemeProviderCustom = ({ children } : any) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
  
      // Update the HTML element class
      if (newMode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
  
      return newMode;
    });
  };

  const colorMode = useMemo(
    () => ({
      toggleColorMode,
    }),
    []
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeContext.Provider value={colorMode as any}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

const useColorMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a ThemeProviderCustom');
  }
  return context;
};

export { ThemeProviderCustom, useColorMode };
