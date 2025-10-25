import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    primary: {
      main: '#FF6B35',    // Orange - Main brand color
      light: '#FF8B5A',   // Lighter shade
      dark: '#CC552A',    // Darker shade
      contrast: '#FFFFFF' // White text on primary
    },
    secondary: {
      main: '#FFB800',    // Yellow - Secondary brand color
      light: '#FFD54F',   // Lighter shade
      dark: '#F57C00',    // Darker shade
      contrast: '#2C3E50' // Dark text on secondary
    },
    wine: {
      main: '#722F37',    // Rich wine red
      light: '#8B3D45',   // Lighter wine
      dark: '#5A252C',    // Deep wine
      pastel: '#F5E6E8',  // Pastel wine
      contrast: '#FFFFFF' // White text on wine
    },
    background: {
      default: '#FFFFFF',     // Pure white
      paper: '#FFF9F0',       // Warm cream
      light: '#FFF5E6',       // Light saffron
      accent: '#F8F0FF',      // Soft purple
      wine: '#F5E6E8',        // Pastel wine background
      dark: '#1A1A1A',        // Dark background
      gradient: {
        primary: 'linear-gradient(135deg, #FFF9F0 0%, #FFF5E6 100%)',
        secondary: 'linear-gradient(135deg, #FFF5E6 0%, #F8F0FF 100%)',
        wine: 'linear-gradient(135deg, #F5E6E8 0%, #FFF9F0 100%)'
      }
    },
    text: {
      primary: '#2C3E50',   // Dark blue for main text
      secondary: '#666666', // Gray for secondary text
      disabled: '#999999',  // Light gray for disabled text
      contrast: '#FFFFFF'   // White text
    },
    error: {
      main: '#DC3545',    // Red for errors
      light: '#FF6B6B',   // Light red
      dark: '#BD2130'     // Dark red
    },
    success: {
      main: '#28A745',    // Green for success
      light: '#4CAF50',   // Light green
      dark: '#1E7E34'     // Dark green
    },
    warning: {
      main: '#FFC107',    // Yellow for warnings
      light: '#FFD54F',   // Light yellow
      dark: '#FFA000'     // Dark yellow
    }
  },
  typography: {
    fontFamily: {
      primary: 'Inter, sans-serif',
      secondary: 'Poppins, sans-serif',
      heading: 'Poppins, sans-serif',
      body: 'Inter, sans-serif'
    },
    h1: {
      fontSize: '2.5rem',    // 40px
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em'
    },
    h2: {
      fontSize: '2rem',      // 32px
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em'
    },
    h3: {
      fontSize: '1.75rem',   // 28px
      fontWeight: 600,
      lineHeight: 1.4
    },
    h4: {
      fontSize: '1.5rem',    // 24px
      fontWeight: 600,
      lineHeight: 1.4
    },
    body1: {
      fontSize: '1rem',      // 16px
      fontWeight: 400,
      lineHeight: 1.5
    },
    body2: {
      fontSize: '0.875rem',  // 14px
      fontWeight: 400,
      lineHeight: 1.5
    },
    button: {
      fontSize: '1rem',      // 16px
      fontWeight: 600,
      lineHeight: 1.5,
      textTransform: 'none'
    },
    caption: {
      fontSize: '0.75rem',   // 12px
      fontWeight: 400,
      lineHeight: 1.5
    }
  },
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    xxl: '3rem'       // 48px
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
    lg: '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)'
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px'
  },
  transitions: {
    default: '0.3s ease',
    fast: '0.15s ease',
    slow: '0.5s ease'
  },
  zIndex: {
    modal: 1000,
    overlay: 900,
    dropdown: 800,
    header: 700,
    footer: 600
  }
};

// Type definitions for the theme
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        main: string;
        light: string;
        dark: string;
        contrast: string;
      };
      secondary: {
        main: string;
        light: string;
        dark: string;
        contrast: string;
      };
      wine: {
        main: string;
        light: string;
        dark: string;
        pastel: string;
        contrast: string;
      };
      background: {
        default: string;
        paper: string;
        light: string;
        accent: string;
        wine: string;
        dark: string;
        gradient: {
          primary: string;
          secondary: string;
          wine: string;
        };
      };
      text: {
        primary: string;
        secondary: string;
        disabled: string;
        contrast: string;
      };
      error: {
        main: string;
        light: string;
        dark: string;
      };
      success: {
        main: string;
        light: string;
        dark: string;
      };
      warning: {
        main: string;
        light: string;
        dark: string;
      };
    };
    typography: {
      fontFamily: {
        primary: string;
        secondary: string;
        heading: string;
        body: string;
      };
      h1: {
        fontSize: string;
        fontWeight: number;
        lineHeight: number;
        letterSpacing: string;
      };
      h2: {
        fontSize: string;
        fontWeight: number;
        lineHeight: number;
        letterSpacing: string;
      };
      h3: {
        fontSize: string;
        fontWeight: number;
        lineHeight: number;
      };
      h4: {
        fontSize: string;
        fontWeight: number;
        lineHeight: number;
      };
      body1: {
        fontSize: string;
        fontWeight: number;
        lineHeight: number;
      };
      body2: {
        fontSize: string;
        fontWeight: number;
        lineHeight: number;
      };
      button: {
        fontSize: string;
        fontWeight: number;
        lineHeight: number;
        textTransform: string;
      };
      caption: {
        fontSize: string;
        fontWeight: number;
        lineHeight: number;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      full: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    transitions: {
      default: string;
      fast: string;
      slow: string;
    };
    zIndex: {
      modal: number;
      overlay: number;
      dropdown: number;
      header: number;
      footer: number;
    };
  }
} 