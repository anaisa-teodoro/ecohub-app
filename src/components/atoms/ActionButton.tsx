import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Add, 
  Edit, 
  Delete, 
  Visibility, 
  Download, 
  Share, 
  Favorite,
  Star,
  Info,
  Settings
} from '@mui/icons-material';

// Interface para as props do botão de ação
interface ActionButtonProps extends ButtonProps {
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  showIcon?: boolean;
  iconType?: 'add' | 'edit' | 'delete' | 'view' | 'download' | 'share' | 'favorite' | 'star' | 'info' | 'settings';
  colorTheme?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
}

// Botão estilizado para ações diversas
const StyledActionButton = styled(Button)<{ $colorTheme?: string }>(({ theme, variant, $colorTheme = 'primary' }) => {
  const getThemeColors = () => {
    switch ($colorTheme) {
      case 'success':
        return {
          main: '#4caf50',
          hover: '#388e3c',
          light: 'rgba(76, 175, 80, 0.1)',
        };
      case 'warning':
        return {
          main: '#ff9800',
          hover: '#f57c00',
          light: 'rgba(255, 152, 0, 0.1)',
        };
      case 'error':
        return {
          main: '#f44336',
          hover: '#d32f2f',
          light: 'rgba(244, 67, 54, 0.1)',
        };
      case 'info':
        return {
          main: '#2196f3',
          hover: '#1976d2',
          light: 'rgba(33, 150, 243, 0.1)',
        };
      case 'secondary':
        return {
          main: '#9c27b0',
          hover: '#7b1fa2',
          light: 'rgba(156, 39, 176, 0.1)',
        };
      default: // primary
        return {
          main: '#2e7d32',
          hover: '#1b5e20',
          light: 'rgba(46, 125, 50, 0.1)',
        };
    }
  };

  const colors = getThemeColors();

  return {
    borderRadius: 10,
    fontWeight: 600,
    textTransform: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    minHeight: 40,
    
    // Estilo para variant contained
    ...(variant === 'contained' && {
      background: `linear-gradient(135deg, ${colors.main} 0%, ${colors.hover} 100%)`,
      color: 'white',
      boxShadow: `0 3px 10px ${colors.light}`,
      '&:hover': {
        background: `linear-gradient(135deg, ${colors.hover} 0%, ${colors.main} 100%)`,
        boxShadow: `0 5px 15px ${colors.light}`,
        transform: 'translateY(-2px)',
      },
      '&:active': {
        transform: 'translateY(0px)',
        boxShadow: `0 2px 5px ${colors.light}`,
      },
    }),
    
    // Estilo para variant outlined
    ...(variant === 'outlined' && {
      background: 'transparent',
      border: `2px solid ${colors.main}`,
      color: colors.main,
      '&:hover': {
        background: colors.light,
        border: `2px solid ${colors.hover}`,
        color: colors.hover,
        transform: 'translateY(-1px)',
      },
    }),
    
    // Estilo para variant text
    ...(variant === 'text' && {
      background: 'transparent',
      color: colors.main,
      '&:hover': {
        background: colors.light,
        color: colors.hover,
      },
    }),
  };
});

const ActionButton: React.FC<ActionButtonProps> = ({
  variant = 'contained',
  size = 'medium',
  showIcon = true,
  iconType = 'add',
  colorTheme = 'primary',
  children,
  ...props
}) => {
  const getIcon = () => {
    if (!showIcon) return undefined;
    
    switch (iconType) {
      case 'add':
        return <Add />;
      case 'edit':
        return <Edit />;
      case 'delete':
        return <Delete />;
      case 'view':
        return <Visibility />;
      case 'download':
        return <Download />;
      case 'share':
        return <Share />;
      case 'favorite':
        return <Favorite />;
      case 'star':
        return <Star />;
      case 'info':
        return <Info />;
      case 'settings':
        return <Settings />;
      default:
        return <Add />;
    }
  };

  const getDefaultText = () => {
    switch (iconType) {
      case 'add':
        return 'Adicionar';
      case 'edit':
        return 'Editar';
      case 'delete':
        return 'Excluir';
      case 'view':
        return 'Visualizar';
      case 'download':
        return 'Baixar';
      case 'share':
        return 'Compartilhar';
      case 'favorite':
        return 'Favoritar';
      case 'star':
        return 'Avaliar';
      case 'info':
        return 'Informações';
      case 'settings':
        return 'Configurações';
      default:
        return 'Ação';
    }
  };

  return (
    <StyledActionButton
      {...props}
      variant={variant}
      size={size}
      startIcon={getIcon()}
      $colorTheme={colorTheme}
    >
      {children || getDefaultText()}
    </StyledActionButton>
  );
};

export default ActionButton;
