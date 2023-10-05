import React from 'react';
import { Button, Container, Typography, AppBar, Toolbar } from '@mui/material';
import { PlayCircleOutline } from '@mui/icons-material'; // An example icon

function Home() {
    return (
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Welcome to Online Poker!
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="xs" style={{ marginTop: '2rem', textAlign: 'center' }}>
                <Typography component="h1" variant="h5">
                    Join rooms, play with friends, and enjoy the thrill of poker from the comfort of your home.
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<PlayCircleOutline />}
                    style={{ marginTop: '1rem' }}
                >
                    Join a Room
                </Button>
            </Container>
            <footer style={{ marginTop: '2rem', textAlign: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                    © 2023 PokerWebsite
                </Typography>
            </footer>
        </Container>
    );
}

export default Home;
