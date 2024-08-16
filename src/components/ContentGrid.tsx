import { useEffect, useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { itemData } from '../services';
import { SortableItem } from './SortableItem';

type ItemType = {
  id: string;
  img: string;
  title: string;
};

export const ContentGrid = () => {
  const [items, setItems] = useState<ItemType[]>(() => {
    const savedItems = localStorage.getItem('items');
    return savedItems ? JSON.parse(savedItems) : itemData;
  });

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 5 }}>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <Grid container spacing={2}>
            {items.map((item) => (
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
