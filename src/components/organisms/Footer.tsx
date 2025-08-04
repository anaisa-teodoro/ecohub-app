import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Divider,
  useTheme,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  LinkedIn,
  Email,
  LocationOn,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  const theme = useTheme();
  
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.mode === 'light' 
          ? theme.palette.primary.main 
          : theme.palette.grey[900],
        color: 'white',
        py: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          {/* Logo e Descrição */}
          <Grid item xs={12} md={8}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: { xs: 1, sm: 2 }
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: { xs: 1, sm: 0 } }}>
                <img 
                  src="/arvore.png" 
                  alt="Árvore" 
                  style={{ 
                    width: 28, 
                    height: 28,
                    filter: 'brightness(0) invert(1)'
                  }} 
                />
              </Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  opacity: 0.9,
                  fontSize: { xs: '0.875rem', sm: '0.9rem' },
                  lineHeight: 1.4,
                  maxWidth: { xs: '100%', sm: '400px' }
                }}
              >
                Unindo quem ama a natureza às ONGs que fazem a diferença.
              </Typography>
            </Box>
          </Grid>

          {/* Contato e Redes Sociais */}
          <Grid item xs={12} md={4}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'row', md: 'column' },
              justifyContent: { xs: 'space-between', md: 'flex-end' },
              alignItems: { xs: 'center', md: 'flex-end' },
              gap: { xs: 2, md: 1 }
            }}>
              {/* Informações de Contato */}
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row', md: 'column' },
                gap: { xs: 0.5, sm: 2, md: 0.5 },
                fontSize: '0.875rem'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Email sx={{ fontSize: 16, color: theme.palette.secondary.main }} />
                  <Typography variant="caption" sx={{ fontSize: '0.8rem' }}>
                    contato@ecohub.com.br
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LocationOn sx={{ fontSize: 16, color: theme.palette.secondary.main }} />
                  <Typography variant="caption" sx={{ fontSize: '0.8rem' }}>
                    Joinville, SC
                  </Typography>
                </Box>
              </Box>

              {/* Redes Sociais */}
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <IconButton 
                  size="small"
                  color="inherit" 
                  aria-label="Facebook"
                  sx={{ 
                    '&:hover': { color: theme.palette.secondary.main },
                    p: 0.5
                  }}
                >
                  <Facebook fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small"
                  color="inherit" 
                  aria-label="Instagram"
                  sx={{ 
                    '&:hover': { color: theme.palette.secondary.main },
                    p: 0.5
                  }}
                >
                  <Instagram fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small"
                  color="inherit" 
                  aria-label="LinkedIn"
                  sx={{ 
                    '&:hover': { color: theme.palette.secondary.main },
                    p: 0.5
                  }}
                >
                  <LinkedIn fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

        {/* Copyright */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.75rem' }}>
            © {new Date().getFullYear()} EcoHub. Todos os direitos reservados.
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.8, fontSize: '0.75rem' }}>
            Desenvolvido nas aulas do FuturoDev 💚 para um mundo mais sustentável!
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
