
import React from 'react';
import { 
  Grid, 
  Container, 
  Typography, 
  Paper, 
  Box,
  Chip,
  Fab,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import CardONG from '../components/molecules/CardONG';
import { getONGs } from '../services/storage';
import { ONG } from '../types/ONG';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const showFAB = useMediaQuery(theme.breakpoints.down('sm')); // FAB apenas em telas muito pequenas
  const ongs: ONG[] = getONGs();

  const totalMeta = ongs.reduce((acc, ong) => acc + ong.meta, 0);
  const totalArrecadado = ongs.reduce((acc, ong) => acc + ong.arrecadado, 0);
  const ongsComMetaAtingida = ongs.filter(ong => ong.arrecadado >= ong.meta).length;

  return (
    <>
      <Container sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant={isMobile ? "h4" : "h3"} 
            gutterBottom 
            sx={{ 
              fontWeight: 'bold', 
              color: 'primary.main',
              px: { xs: 1, sm: 0 }
            }}
          >
            ONGs Ambientais de Joinville
          </Typography>
          <Typography 
            variant={isMobile ? "body1" : "h6"} 
            color="text.secondary" 
            sx={{ 
              mb: 3,
              px: { xs: 2, sm: 0 }
            }}
          >
            Conectando você a causas ambientais que fazem a diferença 🌱
          </Typography>
          
          {/* Resumo das metas - Responsivo */}
          <Paper 
            elevation={3} 
            sx={{ 
              p: { xs: 2, sm: 3 }, 
              mb: 4, 
              backgroundColor: 'primary.main', 
              color: 'white',
              mx: { xs: 1, sm: 0 }
            }}
          >
            <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent="center">
              <Grid item xs={12} sm={4}>
                <Typography 
                  variant={isMobile ? "h5" : "h4"} 
                  sx={{ fontWeight: 'bold' }}
                >
                  R$ {totalArrecadado.toLocaleString()}
                </Typography>
                <Typography variant={isMobile ? "body2" : "body1"}>
                  Total Arrecadado
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography 
                  variant={isMobile ? "h5" : "h4"} 
                  sx={{ fontWeight: 'bold' }}
                >
                  R$ {totalMeta.toLocaleString()}
                </Typography>
                <Typography variant={isMobile ? "body2" : "body1"}>
                  Meta Total
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography 
                  variant={isMobile ? "h5" : "h4"} 
                  sx={{ fontWeight: 'bold' }}
                >
                  {ongsComMetaAtingida}/{ongs.length}
                </Typography>
                <Typography variant={isMobile ? "body2" : "body1"}>
                  Metas Atingidas
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            justifyContent: 'center', 
            flexWrap: 'wrap', 
            mb: 3,
            px: { xs: 1, sm: 0 }
          }}>
            <Chip 
              label={`${Math.round((totalArrecadado / totalMeta) * 100)}% do Total Arrecadado`} 
              color="secondary" 
              variant="outlined"
              size={isMobile ? "small" : "medium"}
            />
          </Box>
        </Box>

        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          gutterBottom 
          sx={{ 
            mb: 3, 
            fontWeight: 'bold',
            px: { xs: 1, sm: 0 }
          }}
        >
          Escolha uma ONG para fazer sua doação:
        </Typography>
        
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {ongs.map((ong) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={ong.id}>
              <CardONG
                id={ong.id}
                nome={ong.nome}
                descricao={ong.descricao}
                imagem={ong.imagem}
                meta={ong.meta}
                arrecadado={ong.arrecadado}
                onDoarClick={(id) => {
                  // Verificar se a ONG existe antes de navegar
                  const ongEncontrada = ongs.find(o => o.id === id);
                  if (ongEncontrada) {
                    console.log('Navegando para doação da ONG:', ongEncontrada.nome, 'ID:', id);
                    navigate(`/doacao?ong=${id}`);
                  } else {
                    console.error('Erro: ONG não encontrada com ID:', id);
                    alert('Erro: ONG não encontrada. Por favor, tente novamente.');
                  }
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FAB para Cadastrar ONG (visível apenas em telas muito pequenas) */}
      {showFAB && (
        <Fab
          color="primary"
          aria-label="Cadastrar ONG"
          onClick={() => navigate('/cadastro-ong')}
          sx={{
            position: 'fixed',
            bottom: 16,
            right: 16,
            zIndex: 1000,
            '&:hover': {
              transform: 'scale(1.1)',
              transition: 'transform 0.2s ease-in-out',
            },
          }}
        >
          <Add />
        </Fab>
      )}
    </>
  );
};

export default Dashboard;