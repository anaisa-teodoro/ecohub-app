import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  LinearProgress,
  Button,
  Box,
  Chip,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { CheckCircle, TrendingUp } from '@mui/icons-material';

interface CardONGProps {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  meta: number;
  arrecadado: number;
  onDoarClick: (id: string) => void;
}

const CardONG: React.FC<CardONGProps> = ({
  id,
  nome,
  descricao,
  imagem,
  meta,
  arrecadado,
  onDoarClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Voltando para md
  const progresso = Math.min((arrecadado / meta) * 100, 100);
  const metaAtingida = arrecadado >= meta;
  const restante = meta - arrecadado;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        // 👇 3. CORREÇÕES PRINCIPAIS AQUI
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[1],
        ...(metaAtingida && {
          borderColor: theme.palette.success.main,
          borderWidth: '2px',
          boxShadow: `0 4px 20px ${theme.palette.success.light}60`, // Sombra verde sutil do tema
        }),
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: metaAtingida 
            ? `0 8px 25px ${theme.palette.success.light}70` 
            : theme.shadows[4],
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height={isMobile ? "140" : "160"}
          image={imagem}
          alt={`Logo da ${nome}`}
          sx={{ objectFit: 'cover' }}
        />
        {metaAtingida && (
          <Chip
            icon={<CheckCircle />}
            label="Meta Atingida!"
            color="success"
            size={isMobile ? "small" : "medium"}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              fontWeight: 'bold',
            }}
          />
        )}
      </Box>
      
      <CardContent sx={{ 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        p: { xs: 2, sm: 3 }
      }}>
        <Typography 
          gutterBottom 
          variant={isMobile ? "subtitle1" : "h6"} 
          component="div" 
          sx={{ 
            fontWeight: 'bold',
            lineHeight: 1.2,
            mb: { xs: 1, sm: 2 }
          }}
        >
          {nome}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: { xs: 1.5, sm: 2 }, 
            flexGrow: 1, 
            lineHeight: 1.4,
            fontSize: { xs: '0.8rem', sm: '0.875rem' }
          }}
        >
          {descricao}
        </Typography>

        <Divider sx={{ mb: { xs: 1.5, sm: 2 } }} />

        {/* Informações da Meta */}
        <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography 
              variant="body2" 
              fontWeight="bold" 
              color="primary"
              sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
            >
              Meta: R$ {meta.toLocaleString()}
            </Typography>
            <Typography 
              variant="body2" 
              fontWeight="bold" 
              color="secondary.main"
              sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
            >
              {progresso.toFixed(1)}%
            </Typography>
          </Box>
          
          <LinearProgress
            variant="determinate"
            value={progresso}
            color={metaAtingida ? 'success' : 'primary'}
            sx={{ 
              height: { xs: 6, sm: 8 }, 
              borderRadius: 4,
            }}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}
            >
              Arrecadado: R$ {arrecadado.toLocaleString()}
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

        <Button
          variant={metaAtingida ? "outlined" : "contained"}
          fullWidth
          onClick={() => onDoarClick(id)}
          disabled={metaAtingida}
          startIcon={metaAtingida ? <CheckCircle /> : <TrendingUp />}
          size={isMobile ? "small" : "medium"}
          sx={{ 
            mt: 'auto',
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: { xs: '0.8rem', sm: '0.875rem' }
          }}
        >
          {metaAtingida ? 'Meta Alcançada' : 'Fazer Doação'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default CardONG;