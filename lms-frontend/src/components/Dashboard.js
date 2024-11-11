import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Grid } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AssignmentCard from './AssignmentCard';

function Dashboard() {
    const [assignments, setAssignments] = useState([]);
    const { token, logout } = useAuth();

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

    return (
        <Container>
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Assignments Dashboard
                </Typography>
                <Button variant="contained" color="secondary" onClick={logout}>
                    Logout
                </Button>
                <Grid container spacing={3} sx={{ mt: 2 }}>
                    {assignments.map((assignment) => (
                        <Grid item xs={12} sm={6} md={4} key={assignment.id}>
                            <AssignmentCard assignment={assignment} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}

export default Dashboard;