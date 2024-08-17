import { useEffect, useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { SortableItem } from './SortableItem';
import { AutoSaveGrid } from './AutoSaveGrid';
import { useQuery } from '../hooks';
import { Backdrop, CircularProgress } from '@mui/material';

export const ContentGrid = () => {
  const { data, loading, handleData } = useQuery();
  const [hasChanges, setHasChanges] = useState(false);

  const handleChanges = (changes: boolean) => setHasChanges(changes);

  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem('items', JSON.stringify(data));
    }
  }, [data]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = data.findIndex((item) => item.id === active.id);
      const newIndex = data.findIndex((item) => item.id === over.id);
      handleData(arrayMove(data, oldIndex, newIndex));
      handleChanges(true);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 5 }}>
      <AutoSaveGrid
        data={data}
        hasChanges={hasChanges}
        handleChange={handleChanges}
      />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={data} strategy={verticalListSortingStrategy}>
          <Grid container spacing={2}>
            {data.map((item) => (
              <SortableItem
                key={item.id}
                id={item.id}
                img={item.img}
                title={item.title}
              />
            ))}
          </Grid>
        </SortableContext>
      </DndContext>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};
