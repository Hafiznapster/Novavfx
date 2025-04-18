import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      backgroundDark: string;
      backgroundLight: string;
      text: string;
      textSecondary: string;
      overlay: string;
      success: string;
      error: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
    fontWeights: {
      light: number;
      regular: number;
      medium: number;
      semiBold: number;
      bold: number;
    };
    borderRadius: {
      small: string;
      medium: string;
      large: string;
      pill: string;
      circle: string;
    };
    shadows: {
      small: string;
      medium: string;
      large: string;
      glow: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
      wide: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    transitions: {
      fast: string;
      medium: string;
      slow: string;
    };
  }
}
