import React from 'react';
import { Card, CardContent, Typography, Link } from '@mui/material';

function AssignmentCard({ assignment }) {
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Assignment {assignment.number}
                </Typography>
                {assignment.githubUrl && (
                    <Typography variant="body2" color="text.secondary">
                        GitHub URL: <Link href={assignment.githubUrl} target="_blank" rel="noopener noreferrer">
                        {assignment.githubUrl}
                    </Link>
                    </Typography>
                )}
                {assignment.branch && (
                    <Typography variant="body2" color="text.secondary">
                        Branch: {assignment.branch}
                    </Typography>
                )}
            </CardContent>
        </Card>
    );
}

export default AssignmentCard;
