import { useState, useEffect, useCallback } from 'react';
import { DateTime } from 'luxon';
import { ItemType, useUpdate } from '../hooks';
import { updateTimer } from '../utils';
import { Backdrop, CircularProgress, Typography } from '@mui/material';

interface IProps {
  data: ItemType[];
  hasChanges: boolean;
  handleChange: (change: boolean) => void;
}
export const AutoSaveGrid = (props: IProps) => {
  const { hasChanges, data, handleChange } = props;
  const [lastSaved, setLastSaved] = useState(() => {
    const saveTime = localStorage.getItem('lastSaved');
    return saveTime ? DateTime.fromISO(saveTime) : DateTime.now();
  });
  const { loading: isUpdating, updateData } = useUpdate();

  const saveData = useCallback(() => {
    if (hasChanges) {
      updateData(data).then(() => {
        setLastSaved(DateTime.now());
        localStorage.setItem('lastSaved', DateTime.now().toISO());
        handleChange(false);
      });
    }
  }, [hasChanges, data, handleChange, updateData]);

  useEffect(() => {
    const debounceTimer = setTimeout(saveData, updateTimer);
    return () => clearTimeout(debounceTimer);
  }, [saveData]);

  return (
    <div>
      <Typography variant="h5">Last saved: {lastSaved.toRelative()}</Typography>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isUpdating}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};
