import React, { useState } from 'react';
import { ThemeProvider, CssBaseline, Switch, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { lightTheme, darkTheme } from '../hooks/ThemeProvider'; // Import your custom themes
import { useEffect } from 'react';

const ThemeSwitch = () => {
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    if (!(theme.palette.mode == 'light')) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme.palette.mode === 'light' ? darkTheme : lightTheme);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <IconButton onClick={toggleTheme}>
          {theme.palette.mode === 'light' ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
        <Switch checked={theme.palette.mode === 'dark'} onChange={toggleTheme} />
      </div>
    </ThemeProvider>
  );
};

export default ThemeSwitch;
