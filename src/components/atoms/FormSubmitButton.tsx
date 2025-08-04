import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Send, Home } from '@mui/icons-material';

// Interface para as props do botão
interface FormSubmitButtonProps extends Omit<ButtonProps, 'type'> {
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  loadingText?: string;
  iconType?: 'send' | 'contact' | 'home';
}

// Botão estilizado com tema ambiental para React Hook Form
const StyledFormButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: 12,
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  minHeight: 44,
  
  // Estilo para variant contained (padrão)
  ...(variant === 'contained' && {
    background: 'linear-gradient(135deg, #4caf50 0%, #81c784 100%)',
    color: 'white',
    boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #388e3c 0%, #66bb6a 100%)',
      boxShadow: '0 6px 16px rgba(76, 175, 80, 0.4)',
      transform: 'translateY(-2px)',
    },
    '&:active': {
      transform: 'translateY(0px)',
      boxShadow: '0 2px 8px rgba(76, 175, 80, 0.3)',
    },
    '&:disabled': {
      background: 'rgba(76, 175, 80, 0.3)',
      color: 'rgba(255, 255, 255, 0.7)',
      boxShadow: 'none',
      transform: 'none',
    },
  }),
  
  // Estilo para variant outlined
  ...(variant === 'outlined' && {
    background: 'transparent',
    border: '2px solid #4caf50',
    color: '#4caf50',
    '&:hover': {
      background: 'rgba(76, 175, 80, 0.08)',
      border: '2px solid #388e3c',
      color: '#388e3c',
      transform: 'translateY(-1px)',
    },
    '&:disabled': {
      border: '2px solid rgba(76, 175, 80, 0.3)',
      color: 'rgba(76, 175, 80, 0.3)',
      transform: 'none',
    },
  }),
  
  // Estilo para variant text
  ...(variant === 'text' && {
    background: 'transparent',
    color: '#4caf50',
    '&:hover': {
      background: 'rgba(76, 175, 80, 0.08)',
      color: '#388e3c',
    },
    '&:disabled': {
      color: 'rgba(76, 175, 80, 0.3)',
    },
  }),
}));

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  variant = 'contained',
  size = 'medium',
  isLoading = false,
  loadingText = 'Enviando...',
  iconType = 'send',
  children,
  ...props
}) => {
  const getIcon = () => {
    if (isLoading) return <CircularProgress size={20} color="inherit" />;
    
    switch (iconType) {
      case 'contact': return (
        <img 
          src="/arvore.png" 
          alt="Árvore" 
          style={{ 
            width: 20, 
            height: 20,
            filter: 'brightness(0) invert(1)'
          }} 
        />
      );
      case 'home': return <Home />;
      default: return <Send />;
    }
  };

  return (
    <StyledFormButton
      {...props}
      type="submit"
      variant={variant}
      size={size}
      disabled={isLoading}
      startIcon={getIcon()}
    >
      {isLoading ? loadingText : children}
    </StyledFormButton>
  );
};

export default FormSubmitButton;