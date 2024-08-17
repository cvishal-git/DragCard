import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { PreviewImage } from './PreviewImage';
import { CardHeader } from '@mui/material';

interface IProps {
  id: string;
  img: string;
  title: string;
}

export const SortableItem = ({ id, img, title }: IProps) => {
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Grid item xs={4} sm={4} md={4}>
        <Box sx={{ position: 'relative', backgroundColor: '#fff' }}>
          <Card
            sx={{
              minHeight: 200,
              cursor: 'pointer',
            }}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
          >
            {loading && (
              <CircularProgress
                size={40}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  zIndex: 1,
                }}
              />
            )}
            <CardHeader title={title} />
            <CardMedia
              component="img"
              image={img}
              alt={title}
              onLoad={() => setLoading(false)}
              sx={{ display: loading ? 'none' : 'block' }}
            />
          </Card>
          <CardActions sx={{ justifyContent: 'flex-end', padding: '8px 16px' }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleOpen}
              sx={{
                textTransform: 'none',
              }}
            >
              Preview
            </Button>
          </CardActions>
        </Box>
      </Grid>
      <PreviewImage
        open={open}
        handleClose={() => setOpen(false)}
        imgSrc={img}
      />
    </>
  );
};
