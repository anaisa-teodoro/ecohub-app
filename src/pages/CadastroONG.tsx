import React from 'react';
import { Container, useMediaQuery, useTheme } from '@mui/material';
import FormDoacao from '../components/molecules/FormDoacao';

const CadastroONG: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: { xs: 2, sm: 4 },
        px: { xs: 1, sm: 3 }
      }}
    >
      <FormDoacao />
    </Container>
  );
};

export default CadastroONG;
