import './App.css';
import Box from '@mui/material/Box';
import Carlist from './Components/Carlist';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              CarShop
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Carlist />
    </>
  );
}

export default App;