import { createTheme } from '@mui/material';
import { blue, purple } from '@mui/material/colors';

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: blue[700],
            light: blue[400],
            dark: blue[900]
        },
        secondary: {
            main: purple[500],
            light: purple[300],
            dark: purple[700]
        },
        background: {
            default: '#f5f5f5',
            paper: '#ffffff'
        }
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 600
                }
            }
        }
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h4: {
            fontWeight: 600
        },
        button: {
            fontWeight: 600
        }
    }
});

const darkTheme = createTheme({
    ...theme,
    palette: {
        mode: 'dark',
        primary: theme.palette.primary,
        secondary: theme.palette.secondary,
        background: {
            default: '#121212',
            paper: '#1e1e1e'
        }
    }
});