import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { CircularProgress } from '@mui/material';

interface IProps {
  open: boolean;
  handleClose: () => void;
  imgSrc: string;
}

export const PreviewImage = (props: IProps) => {
  const { open, handleClose, imgSrc } = props;
  const [loading, setLoading] = useState(true);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 1,
          maxWidth: '90%',
          maxHeight: '90%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {loading && <CircularProgress size={60} />}
        <img
          src={imgSrc}
          alt="Preview"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '100%',
            display: 'block',
            margin: '0 auto',
          }}
          onLoad={() => setLoading(false)}
        />
      </Box>
    </Modal>
  );
};
