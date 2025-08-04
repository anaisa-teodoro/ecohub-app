
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getONGs, updateONGs } from '../services/storage';
import { ONG } from '../types/ONG';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  LinearProgress,
  Container,
  Grid,
  Card,
  CardContent,
  Divider,
  Alert,
  InputAdornment,
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { 
  ArrowBack, 
  Favorite, 
  Cancel, 
  TrendingUp,
  CheckCircle 
} from '@mui/icons-material';

const Doacao: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [ong, setOng] = useState<ONG | null>(null);
  const [valor, setValor] = useState<string>('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const ongs = getONGs();
    // Busca primeiro pelo ID da URL, depois pelo parâmetro de query
    const ongId = id || searchParams.get('ong');
    const encontrada = ongs.find((o) => o.id === ongId);
    if (encontrada) {
      setOng(encontrada);
    }
  }, [id, searchParams]);

  const handleDoar = () => {
    const valorDoado = parseFloat(valor);
    if (!ong || isNaN(valorDoado) || valorDoado <= 0) {
      alert('Por favor, insira um valor válido maior que zero.');
      return;
    }

    const ongs = getONGs();
    const atualizadas = ongs.map((o) =>
      o.id === ong.id
        ? { ...o, arrecadado: o.arrecadado + valorDoado }
        : o
    );
    updateONGs(atualizadas);
    setShowSuccess(true);
    
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  const handleCancelar = () => {
    navigate('/');
  };

  const sugerirValor = (valorSugerido: number) => {
    setValor(valorSugerido.toString());
  };

  if (!ong) {
    return (
      <Container sx={{ mt: 4, px: { xs: 2, sm: 3 } }}>
        <Paper sx={{ p: { xs: 3, sm: 4 }, textAlign: 'center' }}>
          <Alert severity="error" sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              ONG não encontrada
            </Typography>
            <Typography variant="body2">
              A ONG que você está tentando acessar não existe ou foi removida.
            </Typography>
          </Alert>
          <Button 
            startIcon={<ArrowBack />} 
            onClick={handleCancelar}
            variant="contained"
            size={isMobile ? "small" : "medium"}
            sx={{ mt: 2 }}
          >
            Voltar às ONGs
          </Button>
        </Paper>
      </Container>
    );
  }

  const progresso = Math.min((ong.arrecadado / ong.meta) * 100, 100);
  const metaAtingida = ong.arrecadado >= ong.meta;
  const restante = ong.meta - ong.arrecadado;

  if (showSuccess) {
    return (
      <Container sx={{ mt: 4, px: { xs: 2, sm: 3 } }}>
        <Paper sx={{ 
          p: { xs: 3, sm: 4 }, 
          textAlign: 'center',
          mx: { xs: 1, sm: 0 }
        }}>
          <CheckCircle sx={{ 
            fontSize: { xs: 60, sm: 80 }, 
            color: 'success.main', 
            mb: 2 
          }} />
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            gutterBottom 
            color="success.main"
            sx={{ px: { xs: 1, sm: 0 } }}
          >
            Doação Realizada com Sucesso!
          </Typography>
          <Typography 
            variant={isMobile ? "body1" : "h6"}
            sx={{ px: { xs: 1, sm: 0 } }}
          >
            Obrigado por contribuir com a {ong.nome}
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 2,
              px: { xs: 1, sm: 0 }
            }}
          >
            Redirecionando para a página inicial...
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container sx={{ 
      mt: 4, 
      mb: 4,
      px: { xs: 2, sm: 3 }
    }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button 
          startIcon={<ArrowBack />} 
          onClick={handleCancelar}
          variant="outlined"
          size={isMobile ? "small" : "medium"}
          sx={{ 
            fontWeight: 'bold',
            textTransform: 'none'
          }}
        >
          Voltar
        </Button>
        <Typography 
          variant={isMobile ? "h6" : "h5"} 
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main',
            flexGrow: 1
          }}
        >
          Fazer Doação
        </Typography>
      </Box>

      <Grid container spacing={{ xs: 2, sm: 4 }}>
        {/* Informações da ONG */}
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography 
                variant={isMobile ? "h5" : "h4"} 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold', 
                  color: 'primary.main',
                  lineHeight: 1.2
                }}
              >
                {ong.nome}
              </Typography>
              
              {metaAtingida && (
                <Chip
                  icon={<CheckCircle />}
                  label="Meta Atingida!"
                  color="success"
                  size={isMobile ? "small" : "medium"}
                  sx={{ mb: 2, fontWeight: 'bold' }}
                />
              )}
              
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 3, 
                  lineHeight: 1.6,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}
              >
                {ong.descricao}
              </Typography>

              <Divider sx={{ mb: 3 }} />

              <Typography 
                variant={isMobile ? "subtitle1" : "h6"} 
                gutterBottom 
                sx={{ fontWeight: 'bold' }}
              >
                Progresso da Meta
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography 
                    variant="body2" 
                    fontWeight="bold"
                    sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                  >
                    R$ {ong.arrecadado.toLocaleString()} arrecadados
                  </Typography>
                  <Typography 
                    variant="body2" 
                    fontWeight="bold" 
                    color="primary"
                    sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
                  >
                    {progresso.toFixed(1)}%
                  </Typography>
                </Box>
                
                <LinearProgress
                  variant="determinate"
                  value={progresso}
                  color={metaAtingida ? 'success' : 'primary'}
                  sx={{ height: { xs: 8, sm: 12 }, borderRadius: 6 }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                  >
                    Meta: R$ {ong.meta.toLocaleString()}
                  </Typography>
                  {!metaAtingida && (
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
                    >
                      Faltam: R$ {restante.toLocaleString()}
                    </Typography>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Formulário de Doação */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: { xs: 3, sm: 4 } }}>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              gutterBottom 
              sx={{ 
                fontWeight: 'bold', 
                display: 'flex', 
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 1
              }}
            >
              <Favorite sx={{ color: 'secondary.main' }} />
              Fazer uma Doação
            </Typography>
            
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mb: 3,
                fontSize: { xs: '0.8rem', sm: '0.875rem' }
              }}
            >
              Sua contribuição faz a diferença para o meio ambiente!
            </Typography>

            {!metaAtingida && (
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 1,
                    fontSize: { xs: '0.8rem', sm: '0.875rem' }
                  }}
                >
                  Valores sugeridos:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {[50, 100, 200, 500].map((valorSugerido) => (
                    <Chip
                      key={valorSugerido}
                      label={`R$ ${valorSugerido}`}
                      onClick={() => sugerirValor(valorSugerido)}
                      clickable
                      variant="outlined"
                      color="primary"
                      size={isMobile ? "small" : "medium"}
                    />
                  ))}
                </Box>
              </Box>
            )}

            <TextField
              label="Valor da Doação"
              type="number"
              fullWidth
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              sx={{ mb: 3 }}
              size={isMobile ? "small" : "medium"}
              InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
              }}
              inputProps={{
                min: 1,
                step: 0.01,
              }}
              disabled={metaAtingida}
              helperText={metaAtingida ? "Esta ONG já atingiu sua meta!" : "Digite o valor que deseja doar"}
            />

            <Box sx={{ 
              display: 'flex', 
              gap: { xs: 1, sm: 2 }, 
              flexDirection: { xs: 'column', sm: 'row' },
              mt: 2
            }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleDoar}
                disabled={metaAtingida || !valor || parseFloat(valor) <= 0}
                startIcon={<TrendingUp />}
                size={isMobile ? "medium" : "large"}
                sx={{ 
                  flexGrow: 1,
                  fontWeight: 'bold',
                  textTransform: 'none',
                  py: { xs: 1.5, sm: 1.2 },
                }}
                fullWidth={isMobile}
              >
                {metaAtingida ? 'Meta Atingida' : 'Confirmar Doação'}
              </Button>
              
              <Button
                variant="outlined"
                color="error"
                onClick={handleCancelar}
                startIcon={<Cancel />}
                size={isMobile ? "medium" : "large"}
                sx={{ 
                  fontWeight: 'bold',
                  textTransform: 'none',
                  py: { xs: 1.5, sm: 1.2 },
                  minWidth: { xs: 'auto', sm: '120px' }
                }}
                fullWidth={isMobile}
              >
                Cancelar
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Doacao;
