import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { ArrowBack, Home, Close } from '@mui/icons-material';

// Interface para as props do botão de voltar
interface BackButtonProps extends Omit<ButtonProps, 'onClick'> {
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  showIcon?: boolean;
  iconType?: 'back' | 'home' | 'close';
  customRoute?: string; // Rota personalizada ou -1 para history.back()
  useHistoryBack?: boolean; // Se true, usa history.back() ao invés de navigate
}

// Botão estilizado para voltar/cancelar
const StyledBackButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: 12,
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  minHeight: 44,
  
  // Estilo para variant contained
  ...(variant === 'contained' && {
    background: 'linear-gradient(135deg, #757575 0%, #9e9e9e 100%)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(117, 117, 117, 0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #424242 0%, #757575 100%)',
      boxShadow: '0 6px 16px rgba(117, 117, 117, 0.4)',
      transform: 'translateY(-2px)',
    },
    '&:active': {
      transform: 'translateY(0px)',
      boxShadow: '0 2px 8px rgba(117, 117, 117, 0.3)',
    },
  }),
  
  // Estilo para variant outlined
  ...(variant === 'outlined' && {
    background: 'transparent',
    border: '2px solid #757575',
    color: '#757575',
    '&:hover': {
      background: 'rgba(117, 117, 117, 0.08)',
      border: '2px solid #424242',
      color: '#424242',
      transform: 'translateY(-1px)',
    },
  }),
  
  // Estilo para variant text
  ...(variant === 'text' && {
    background: 'transparent',
    color: '#757575',
    '&:hover': {
      background: 'rgba(117, 117, 117, 0.08)',
      color: '#424242',
    },
  }),
}));

const BackButton: React.FC<BackButtonProps> = ({
  variant = 'outlined',
  size = 'medium',
  showIcon = true,
  iconType = 'back',
  customRoute = '/',
  useHistoryBack = false,
  children,
  ...props
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (useHistoryBack) {
      window.history.back();
    } else {
      navigate(customRoute);
    }
  };

  const getIcon = () => {
    if (!showIcon) return undefined;
    
    switch (iconType) {
      case 'back':
        return <ArrowBack />;
      case 'home':
        return <Home />;
      case 'close':
        return <Close />;
      default:
        return <ArrowBack />;
    }
  };

  const getDefaultText = () => {
    switch (iconType) {
      case 'home':
        return 'Início';
      case 'close':
        return 'Fechar';
      default:
        return 'Voltar';
    }
  };

  return (
    <StyledBackButton
      {...props}
      variant={variant}
      size={size}
      onClick={handleClick}
      startIcon={getIcon()}
    >
      {children || getDefaultText()}
    </StyledBackButton>
  );
};

export default BackButton;
