// src/App.tsx
import React, { useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { CustomThemeProvider, useTheme } from './contexts/ThemeContext';
import Dashboard from './pages/Dashboard';
import Doacao from './pages/Doacao';
import CadastroONG from './pages/CadastroONG';
import Header from './components/organisms/Header';
import Footer from './components/organisms/Footer';
import { initializeONGs } from './services/storage';

// Componente que lida com a criação do tema dinâmico
const AppContent = () => {
  const { mode } = useTheme(); // 1. Pega o modo (light/dark) do nosso contexto

  // 2. Recria o tema do MUI toda vez que o 'mode' mudar
  const theme = useMemo(() => createTheme({
    palette: {
      mode, // magic ✨: 'light' ou 'dark'
      primary: {
        main: '#2E7D32',
      },
      secondary: {
        main: '#4CAF50',
      },
      // Você pode definir cores diferentes para o background de cada modo
      background: {
        default: mode === 'light' ? '#f5f5f5' : '#121212',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  }), [mode]);

  // 3. Usa o ThemeProvider do MUI para aplicar o tema dinâmico
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline /> 
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Header />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/doar/:id" element={<Doacao />} />
              <Route path="/doacao" element={<Doacao />} />
              <Route path="/cadastro-ong" element={<CadastroONG />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </BrowserRouter>
    </MuiThemeProvider>
  );
};

// A função App principal agora só precisa prover o nosso contexto customizado
function App() {
  useEffect(() => {
    initializeONGs();
  }, []);

  return (
    <CustomThemeProvider>
      <AppContent />
    </CustomThemeProvider>
  );
}

export default App;