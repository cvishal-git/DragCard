import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { itemData } from '../services';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export function ResponsiveGrid() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 5,
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        {itemData.map((item, index) => (
          <Grid xs={4} sm={4} md={4} key={index}>
            <Item>
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
