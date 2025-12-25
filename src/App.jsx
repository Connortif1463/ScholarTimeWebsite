import './App.css'
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import AppTheme from './shared-theme/AppTheme';
import AppAppBar from './marketing-page/components/AppAppBar';
import Hero from './marketing-page/components/Hero';
import LogoCollection from './marketing-page/components/LogoCollection';
import FAQ from './marketing-page/components/FAQ';
import Footer from './marketing-page/components/Footer';

// CSS Styling on Dividers for 
const ThemeAwareDivider = styled(Divider)(({ theme }) => ({
  borderColor: 'var(--divider-color)',
  '&:before, &:after': {
    borderColor: 'var(--divider-color)',
  },
}));



function App(props) {

  return (
    <>
      <AppTheme {...props}>
        <CssBaseline enableColorScheme />
        <AppAppBar />
        <Hero />
        <div style={{
          '--divider-color-light': '#000000',
          '--divider-color-dark': '#FFFFFF',
        }}>
          <ThemeAwareDivider />
          <LogoCollection />
          <ThemeAwareDivider />
          <FAQ />
          <ThemeAwareDivider />
          <Footer />
        </div>
      </AppTheme>
    </>
  )
}

export default App