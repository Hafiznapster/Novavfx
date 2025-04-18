import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import '@/styles/globals.css';

const theme = {
  colors: {
    primary: '#000000',
    secondary: '#F5B95F',
    accent: '#E8A948',
    background: '#F5F2EA',
    backgroundDark: '#0a0a0a',
    backgroundLight: '#FBF8F1',
    text: '#000000',
    textSecondary: '#555555',
    overlay: 'rgba(245, 242, 234, 0.8)',
    success: '#00c853',
    error: '#ff1744',
  },
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '16px',
    pill: '30px',
    circle: '50%',
  },
  shadows: {
    small: '0 2px 8px rgba(0, 0, 0, 0.15)',
    medium: '0 4px 16px rgba(0, 0, 0, 0.2)',
    large: '0 8px 30px rgba(0, 0, 0, 0.3)',
    glow: '0 0 20px',
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '4rem',
  },
  transitions: {
    fast: '0.2s ease',
    medium: '0.3s ease',
    slow: '0.5s ease',
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;