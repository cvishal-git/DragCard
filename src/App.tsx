import { Box, Container, CssBaseline } from '@mui/material';
import { Card } from './components';
import { ResponsiveGrid } from './components/Grid';

const App = () => {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          justifyContent: 'center',
          alignContent: 'center',
          minHeight: '100vh',
          bgcolor: 'lightgray',
          width: '100vw',
        }}
      >
        <ResponsiveGrid />
      </Box>
    </>
  );
  //
};

export default App;
