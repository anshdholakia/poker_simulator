import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Typography, Box, AppBar, Toolbar } from '@mui/material';
import PopupComponent from '../components/Popup';
import { PlayCircleOutline } from '@mui/icons-material';
import CreateRoomForm from '../components/CreateRoomForm';

function Home() {

    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isCreateRoomForm, setCreateRoomForm] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [loggedIn, setLoggedIn] = useState("");

    const handleLoginClick = () => {
        setPopupMessage('login');
        setPopupOpen(true);
    };

    const handleSignupClick = () => {
        setPopupMessage('signup');
        setPopupOpen(true);
    };

    const handleLogoffClick = () => {
        setPopupMessage('logout');
        setPopupOpen(true);
    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/verifyToken', { withCredentials: true })
            .then(res => {
                setLoggedIn(res.data.username);
            })
            .catch(error => {
                setLoggedIn("");
            });
    }, []);

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Poker Simulator
                    </Typography>
                    {loggedIn === "" ? (
                        <>
                            <Button color="inherit" onClick={handleLoginClick} style={{ border: '2px solid white', marginRight: '10px' }}>Login</Button>
                            <Button color="inherit" onClick={handleSignupClick} style={{ border: '2px solid white' }}>Signup</Button>

                            <PopupComponent isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} message={popupMessage} setLoggedIn={setLoggedIn} />
                        </>
                    ) : <>
                        <Typography variant='h7' style={{ marginRight: '10px' }}>
                            Welcome {loggedIn}!
                        </Typography>
                        <Button color="inherit" onClick={handleLogoffClick} style={{ border: '2px solid white' }}>Logoff</Button>
                        <PopupComponent isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} message={popupMessage} setLoggedIn={setLoggedIn} onSuccess={()=>{setCreateRoomForm(false)}}/>
                    </>}
                </Toolbar>
            </AppBar>
            <Container style={{
                maxWidth: '100%',
                padding: '0px',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                backgroundImage: `url(${process.env.PUBLIC_URL + '/home_background.png'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                {!isCreateRoomForm || loggedIn === "" ?
                    <Box flexGrow={1} display="flex" justifyContent="center"
                        alignItems="center" flexDirection="row" width="100%">
                        <Container>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                margin="auto"
                                width="40%"
                                flexDirection="column"
                            >
                                <img src={process.env.PUBLIC_URL + '/poker_chip_logo.png'} alt="Poker Logo" style={{ maxWidth: '100%', height: 'auto' }} />
                                <Typography component="h1" variant="h5" style={{ color: 'white', WebkitTextStroke: '1px black' }}>
                                    Poker Simulator. Click on the following options:
                                </Typography>
                            </Box>
                        </Container>
                        <Container component="main" style={{ marginTop: '2rem', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                margin="auto"
                                width="50%"
                                flexDirection="column"
                            >
                                <img src={process.env.PUBLIC_URL + '/poker_dealer.png'} alt="Poker Dealer" style={{ maxWidth: '80%', height: 'auto' }} />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<PlayCircleOutline />}
                                    style={{ marginTop: '1rem', margin: 'auto' }}
                                    disabled={!loggedIn}
                                    onClick={() => setCreateRoomForm(true)}
                                >
                                    Create a Room
                                </Button>
                            </Box>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                margin="auto"
                                width="50%"
                                flexDirection="column"
                            >
                                <img src={process.env.PUBLIC_URL + '/playing_poker_clipart.png'} alt="Poker Dealer" style={{ maxWidth: '77%', height: 'auto' }} />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<PlayCircleOutline />}
                                    style={{ marginTop: '10px' }}
                                    disabled={!loggedIn}
                                >
                                    Join a Room
                                </Button>
                            </Box>
                        </Container>
                    </Box>
                    :
                    <CreateRoomForm onClose={() => setCreateRoomForm(false)} />
                }
            </Container>


            <footer style={{ textAlign: 'center', width: '100%', backgroundColor: 'gray' }}>
                <Typography variant="body2" color="textSecondary">
                    © 2023 PokerWebsite
                </Typography>
            </footer>
        </>
    );
}

export default Home;
