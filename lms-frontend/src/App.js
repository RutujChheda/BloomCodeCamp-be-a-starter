import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '2rem',
                },
            },
        },
    },
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

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const currentTheme = darkMode ? darkTheme : theme;

    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline /> {/* This ensures the dark mode applies to the entire app */}
            <AuthProvider>
                <Router>
                    <Container maxWidth="lg" sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh',
                        position: 'relative',
                        padding: { xs: '1rem', sm: '2rem' }, // Responsive padding
                    }}>
                        <Box sx={{
                            position: 'absolute',
                            top: { xs: 8, sm: 16 },
                            right: { xs: 8, sm: 16 },
                            zIndex: 1000
                        }}>
                            <IconButton
                                onClick={() => setDarkMode(!darkMode)}
                                color="inherit"
                                sx={{
                                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                    '&:hover': {
                                        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
                                    }
                                }}
                            >
                                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                        </Box>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/dashboard"
                                element={
                                    <PrivateRoute>
                                        <Dashboard />
                                    </PrivateRoute>
                                }
                            />
                            <Route path="/" element={<Navigate to="/login" />} />
                        </Routes>
                    </Container>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
