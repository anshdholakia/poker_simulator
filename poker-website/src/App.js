import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
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
        <ThemeProvider theme={theme}>
            <Home />
        </ThemeProvider>
    );
}

export default App;
