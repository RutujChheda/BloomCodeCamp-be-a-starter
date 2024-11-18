import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Grid, Drawer, List, ListItem, ListItemText, IconButton, AppBar, Toolbar, Dialog, DialogTitle, DialogContent } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AssignmentCard from './AssignmentCard';

function Dashboard() {
    const [assignments, setAssignments] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const { token, logout, user } = useAuth();

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/assignments', {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true
                });
                setAssignments(response.data);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        };

        fetchAssignments();
    }, [token]);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleProfileClick = () => {
        setProfileOpen(true);
    };

    const handleCloseProfile = () => {
        setProfileOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Learner Dashboard
                    </Typography>
                    <Button color="inherit" onClick={logout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                open={drawerOpen}
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <CloseIcon />
                </IconButton>
                <List>
                    <ListItem button onClick={handleProfileClick}>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Assignments" />
                    </ListItem>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8, ml: drawerOpen ? '240px' : '0' }}>
                <Grid container spacing={3}>
                    {assignments.map((assignment) => (
                        <Grid item xs={12} sm={6} md={4} key={assignment.id}>
                            <AssignmentCard assignment={assignment} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Dialog open={profileOpen} onClose={handleCloseProfile}>
                <DialogTitle>Profile</DialogTitle>
                <DialogContent>
                    {user ? (
                        <Typography variant="body1">User Name: {user.username}</Typography>
                    ) : (
                        <Typography variant="body1">User not found</Typography>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default Dashboard;