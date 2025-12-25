import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import ScholarTimeLogo from "../../assets/icons/ScholarTime-Larger-Transparent-Logo.png";

// Create a styled component that receives theme mode as a prop
const LogoContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'themeMode',
})(({ theme, themeMode }) => ({
  position: 'relative',
  width: '45%',
  height: '45%',
  borderRadius: '50%',
  overflow: 'hidden',
  transition: 'transform 0.2s ease-out',
  cursor: 'pointer',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // TODO: Fix this so the gradient works in dark mode
    // background: themeMode === 'light' 
    // ? 'radial-gradient(circle at center, hsl(210, 100%, 90%) 0%, transparent 70%)'
    // : 'radial-gradient(circle at center, hsl(210, 100%, 16%) 0%, transparent 70%)',
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
    transition: 'filter 0.3s ease-in-out, transform 0.2s ease-out',
  },
  '&:hover .logo-image': {
    filter: 'brightness(1.1)',
  },
}));

const StyledBox = styled('div')(({ theme }) => ({
  alignSelf: 'center',
  width: '100%',
  height: 400,
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: '6px solid',
  outlineColor: 'hsla(220, 25%, 80%, 0.2)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: '0 0 12px 8px hsla(220, 25%, 80%, 0.2)',
  backgroundImage: `url(${import.meta.env.VITE_TEMPLATE_IMAGE_URL || 'https://mui.com'}/static/screenshots/material-ui/getting-started/templates/dashboard.jpg)`,
  backgroundSize: 'cover',
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(10),
    height: 700,
  },
  ...theme.applyStyles('dark', {
    boxShadow: '0 0 24px 12px hsla(210, 100%, 25%, 0.2)',
    backgroundImage: `url(${import.meta.env.VITE_TEMPLATE_IMAGE_URL || 'https://mui.com'}/static/screenshots/material-ui/getting-started/templates/dashboard-dark.jpg)`,
    outlineColor: 'hsla(220, 20%, 42%, 0.1)',
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const theme = useTheme(); // Gets current theme
  const themeMode = theme.palette.mode; // Gets current mode toggle (light/dark)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center (normalized -1 to 1)
    const x = ((e.clientX - centerX) / (rect.width / 2)) * 0.9;
    const y = ((e.clientY - centerY) / (rect.height / 2)) * 0.9;
    
    // Apply magnetic effect: move opposite to mouse direction with easing
    const strength = 0.2;
    const distance = Math.sqrt(x * x + y * y);
    const easedStrength = strength * (1 - Math.exp(-distance * 3));
    
    const moveX = -x * easedStrength * 100;
    const moveY = -y * easedStrength * 100;
    
    setMousePosition({ x: moveX, y: moveY });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const distance = Math.sqrt(mousePosition.x * mousePosition.x + mousePosition.y * mousePosition.y);
  const scale = 1 + (distance / 1000);

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'radial-gradient(ellipse 100% 50% at 50% -10%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 100% 50% at 50% -10%, hsl(210, 100%, 16%), transparent)',
        }),
      })}
    >
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
          px: { xs: 2, sm: 4, md: 6 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <LogoContainer
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            themeMode={themeMode} // Pass the current theme mode
            sx={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px) scale(${scale})`,
              transition: 'transform 0.15s ease-out',
            }}
          >
            <Box
              component="img"
              src={ScholarTimeLogo}
              alt="ScholarTime Logo"
              className="logo-image"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`,
                transition: 'transform 0.15s ease-out',
              }}
            />
          </LogoContainer>
          
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
            }}
          >
            Work,&nbsp;study,&nbsp;and&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: 'inherit',
                color: 'primary.main',
                ...theme.applyStyles('dark', {
                  color: 'primary.light',
                }),
              })}
            >
              focus.
            </Typography>
          </Typography>
          
          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
            }}
          >
            Our extension restricts browser usage to limit oneself from distraction and loss of time.
            I personally suffer from ADHD, and wanted to build a tool that could keep me accountable to myself
            and minimize the time spent on important tasks, so I can get back to what matters.
          </Typography>
          
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ minWidth: 'fit-content', alignContent: 'center' }}
          >
            Install now on the Chrome Web Store 
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}