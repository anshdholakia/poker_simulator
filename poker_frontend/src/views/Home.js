import React from 'react';
import { Button, Container, Typography, Box } from '@mui/material';
import { PlayCircleOutline } from '@mui/icons-material';

function Home() {
   return (
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
                  <img src={process.env.PUBLIC_URL + '/poker_chip_logo.png'} alt="Poker Logo" style={{ maxWidth: '80%', height: 'auto' }} />
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
                  >
                     Join a Room
                  </Button>
               </Box>
            </Container>
         </Box>

         <footer style={{ textAlign: 'center', width: '100%', backgroundColor: 'gray' }}>
            <Typography variant="body2" color="textSecondary">
               © 2023 PokerWebsite
            </Typography>
         </footer>
      </Container>
   );
}

export default Home;