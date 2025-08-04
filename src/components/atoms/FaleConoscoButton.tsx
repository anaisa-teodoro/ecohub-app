import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Chat, ContactSupport } from '@mui/icons-material';

// Interface para as props do botão
interface FaleConoscoButtonProps extends Omit<ButtonProps, 'onClick'> {
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  showIcon?: boolean;
  customRoute?: string;
  iconType?: 'chat' | 'support';
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
  }),
  
  // Estilo para variant text
  ...(variant === 'text' && {
    background: 'transparent',
    color: '#4caf50',
    '&:hover': {
      background: 'rgba(76, 175, 80, 0.08)',
      color: '#388e3c',
    },
  }),
}));

const FaleConoscoButton: React.FC<FaleConoscoButtonProps> = ({
  variant = 'contained',
  size = 'medium',
  showIcon = true,
  customRoute = '/cadastro-ong',
  iconType = 'chat',
  children,
  ...props
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(customRoute);
  };

  const getIcon = () => {
    if (!showIcon) return undefined;
    return iconType === 'chat' ? <Chat /> : <ContactSupport />;
  };

  return (
    <StyledFormButton
      {...props}
      variant={variant}
      size={size}
      onClick={handleClick}
      startIcon={getIcon()}
    >
      {children || 'Fale Conosco'}
    </StyledFormButton>
  );
};

export default FaleConoscoButton;
