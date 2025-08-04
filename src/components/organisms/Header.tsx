import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton,
  Chip,
  Button,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme as useMuiTheme
} from '@mui/material';
import { 
  Home, 
  Add, 
  Menu as MenuIcon, 
  Close as CloseIcon,
  Nature,
  FavoriteOutlined
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeSwitcher } from '../molecules/ThemeSwitcher';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const muiTheme = useMuiTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md')); // Voltando para md
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    {
      text: 'Início',
      icon: <Home />,
      onClick: () => {
        navigate('/');
        setMobileMenuOpen(false);
      },
      show: location.pathname !== '/'
    },
    {
      text: 'Cadastrar ONG',
      icon: <Add />,
      onClick: () => {
        navigate('/cadastro-ong');
        setMobileMenuOpen(false);
      },
      show: true
    },
    {
      text: 'Ver ONGs',
      icon: <FavoriteOutlined />,
      onClick: () => {
        navigate('/');
        setMobileMenuOpen(false);
      },
      show: location.pathname !== '/'
    }
  ];

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          {/* Logo e ícone da árvore */}
          <IconButton 
            edge="start" 
            color="inherit" 
            onClick={() => navigate('/')}
            sx={{ mr: { xs: 1, sm: 2 } }}
          >
            <img 
              src="/arvore.png" 
              alt="Árvore" 
              style={{ 
                width: 24, 
                height: 24,
                filter: 'brightness(0) invert(1)'
              }} 
            />
          </IconButton>
          
          {/* Título com chip responsivo */}
          <Typography
            variant={isMobile ? "h6" : "h5"}
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              cursor: 'pointer',
              fontFamily: 'Roboto, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.5, sm: 1 },
            }}
            onClick={() => navigate('/')}
          >
            EcoHub
            <Chip 
              label="Joinville" 
              size={isMobile ? "small" : "small"} 
              color="secondary" 
              sx={{ 
                ml: { xs: 0.5, sm: 1 },
                fontSize: { xs: '0.7rem', sm: '0.75rem' }
              }}
            />
          </Typography>

          {/* Menu Desktop */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'rgba(255,255,255,0.8)',
                  display: { xs: 'none', lg: 'block' }
                }}
              >
                🌱 Conectando você a causas ambientais
              </Typography>
              
              <Button
                variant="outlined"
                size="small"
                startIcon={<Add />}
                onClick={() => navigate('/cadastro-ong')}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.5)',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  },
                  textTransform: 'none',
                  fontWeight: 'bold',
                }}
              >
                Cadastrar ONG
              </Button>
              
              {location.pathname !== '/' && (
                <IconButton 
                  color="inherit" 
                  onClick={() => navigate('/')}
                  sx={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                    }
                  }}
                >
                  <Home />
                </IconButton>
              )}
            </Box>
          )}

          {/* Theme Switcher sempre visível */}
          <ThemeSwitcher />

          {/* Menu Hambúrguer para Mobile */}
          {isMobile && (
            <IconButton
              color="inherit"
              onClick={handleMobileMenuToggle}
              sx={{ ml: 1 }}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer para Menu Mobile */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            pt: 2,
            backgroundColor: 'background.paper'
          },
        }}
      >
        <Box sx={{ px: 2, pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Nature sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              EcoHub Menu
            </Typography>
          </Box>
          
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              mb: 2,
              fontStyle: 'italic'
            }}
          >
            🌱 Conectando você a causas ambientais
          </Typography>
        </Box>

        <List>
          {menuItems
            .filter(item => item.show)
            .map((item, index) => (
              <ListItem 
                key={index}
                onClick={item.onClick}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                  borderRadius: 1,
                  mx: 1,
                  mb: 0.5,
                }}
              >
                <ListItemIcon sx={{ color: 'primary.main', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: 'text.primary'
                  }}
                />
              </ListItem>
            ))}
        </List>
      </Drawer>
    </>
  );
};

export default Header;