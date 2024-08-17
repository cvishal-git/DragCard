import { Box, CssBaseline } from '@mui/material';
import { ContentGrid } from './components/';

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
        <ContentGrid />
      </Box>
    </>
  );
  //
};

export default App;
