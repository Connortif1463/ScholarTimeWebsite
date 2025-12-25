import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useColorScheme } from '@mui/material/styles';
import githubLightMode from '../../assets/github-light-mode.svg'
import githubDarkMode from '../../assets/github-dark-mode.svg'
import Link from '@mui/material/Link';

const darkModeLogos = [
  githubDarkMode,
];

const lightModeLogos = [
  githubLightMode,
];

const logoStyle = {
  width: '100px',
  height: '80px',
  margin: '0 32px',
  opacity: 0.7,
};

export default function LogoCollection() {
  const { mode, systemMode } = useColorScheme();
  let logos;
  if (mode === 'system') {
    if (systemMode === 'light') {
      logos = lightModeLogos;
    } else {
      logos = darkModeLogos;
    }
  } else if (mode === 'light') {
    logos = lightModeLogos;
  } else {
    logos = darkModeLogos;
  }

  return (
    <Box id="logoCollection" sx={{ py: 7 }}>
      <Typography
        variant="h2"
        align="center"
        sx={(theme) => ({
          color: 'primary.main',
          ...theme.applyStyles('dark', {
            color: 'primary.light',
          }),
        })}
      > 
      Github Repository
      </Typography>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ textAlign: 'center' }}
      >
        Clone our codebase from&nbsp;
        <Link href="https://github.com/Connortif1463/ScholarTimeProject" target="_blank" color="primary">
              here
        </Link>
        .
      </Typography>
      <Grid container sx={{ justifyContent: 'center', mt: 0.5, opacity: 0.6 }}>
        {logos.map((logo, index) => (
          <Grid key={index}>
            <img
              src={logo}
              alt={`Fake company number ${index + 1}`}
              style={logoStyle}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
