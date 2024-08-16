import { useState } from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { itemData } from '../services';

const SortableItem = (props: { id: string; img: string; title: string }) => {
  const { id, img, title } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Grid
      item
      xs={4}
      sm={4}
      md={4}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid #ccc',
          padding: 2,
          backgroundColor: '#fff',
        }}
      >
        <img
          src={img}
          alt={title}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </Box>
    </Grid>
  );
};

export const ContentGrid = () => {
  const [items, setItems] = useState(itemData);

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
