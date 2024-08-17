import { useEffect } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { SortableItem } from './SortableItem';
import { useQuery } from '../hooks/useQuery';

export const ContentGrid = () => {
  const { data, handleData } = useQuery();

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
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 5 }}>
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
    </Box>
  );
};
