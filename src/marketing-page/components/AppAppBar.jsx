import * as React from 'react';
import { useState, useRef } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { HashLink as Link } from 'react-router-hash-link';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';
import ScholarTimeClock from "../../assets/icons/convertico-ScholarTime_Logo/convertico-ScholarTime_Logo_128x128.png";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 40,
  height: 40,
  borderRadius: '50%',
  overflow: 'hidden',
  transition: 'transform 0.15s ease-out',
  cursor: 'pointer',
  marginRight: '12px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: theme.palette.mode === 'light' 
      ? 'radial-gradient(circle at center, hsla(210, 100%, 60%, 0.3) 0%, transparent 70%)'
      : 'radial-gradient(circle at center, hsla(210, 100%, 30%, 0.4) 0%, transparent 70%)',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    zIndex: 0,
    pointerEvents: 'none',
  },
  '&:hover::before': {
    opacity: 1,
  },
  '& .logo-image': {
    position: 'relative',
    zIndex: 1,
    transition: 'filter 0.3s ease-in-out, transform 0.15s ease-out',
  },
  '&:hover .logo-image': {
    filter: 'brightness(1.1)',
  },
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const logoRef = useRef(null);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleMouseMove = (e) => {
    if (!logoRef.current) return;
    
    const rect = logoRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center (normalized -1 to 1)
    const x = ((e.clientX - centerX) / (rect.width / 2)) * 0.4; // Increased intensity for more distance
    const y = ((e.clientY - centerY) / (rect.height / 2)) * 0.4; // Increased intensity for more distance
    
    // Apply magnetic effect: move opposite to mouse direction with easing
    const strength = 0.1;
    const distance = Math.sqrt(x * x + y * y);
    const easedStrength = strength * (1 - Math.exp(-distance * 2.5)); // Adjusted easing
    
    const moveX = -x * easedStrength * 100;
    const moveY = -y * easedStrength * 100;
    
    setMousePosition({ x: moveX, y: moveY });
  };

  const handleMouseLeave = () => {
    // Smoothly return to center
    setMousePosition({ x: 0, y: 0 });
  };

  // Calculate scale based on mouse distance from center
  const distance = Math.sqrt(mousePosition.x * mousePosition.x + mousePosition.y * mousePosition.y);
  const scale = 1 + (distance / 400); // Increased scale effect

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth={false} sx={{ px: { xs: 2, sm: 4, md: 6 } }}>
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <LogoContainer
              ref={logoRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              sx={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(${scale})`,
              }}
            >
              <Box
                component="img"
                src={ScholarTimeClock}
                alt="ScholarTime Clock"
                className="logo-image"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  transform: `translate(${-mousePosition.x * 0.4}px, ${-mousePosition.y * 0.4}px)`,
                }}
              />
            </LogoContainer>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              <Button variant="text" color="info" size="small" >
                Chrome Web Store
              </Button>
              <Button href="https://github.com/Connortif1463/ScholarTimeProject" 
              target="_blank"
              variant="text" color="info" size="small">
                GitHub
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
              >
                FAQ
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem>FAQ</MenuItem>
                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth>
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth>
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}