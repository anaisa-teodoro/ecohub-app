// src/components/molecules/ThemeSwitcher.tsx
import React from 'react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4'; // Ícone Dark
import Brightness7Icon from '@mui/icons-material/Brightness7'; // Ícone Light
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeSwitcher = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
      {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};