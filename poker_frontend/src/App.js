import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';


const theme = createTheme({
    palette: {
        primary: {
            main: '#007BFF',  // Example color, you can customize as per your needs
        },
        // Add other theme customization if needed
    },
});

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <ThemeProvider theme={theme}>
                        <Home />
                    </ThemeProvider>
                } />
            </Routes>
        </Router >
    );
}

export default App;
