import React, { useState } from 'react';
import { SortableItem } from './SortableItem';
import { reorderList } from '../utils/sortableUtils';

interface Item {
  id: string;
  content: string;
}

interface SortableListProps {
  value: Item[];
  onChange: (items: Item[]) => void;
}

export const SortableList: React.FC<SortableListProps> = ({ value, onChange }) => {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [currentItems, setCurrentItems] = useState<Item[]>(value);

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    onChange(currentItems);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLIElement>, targetId: string) => {
    e.preventDefault();
    if (draggedId && draggedId !== targetId) {
      const newItems = reorderList(currentItems, draggedId, targetId);
      setCurrentItems(newItems);
    }
  };

  return (
    <ul className="space-y-2 w-full">
      {currentItems.map((item, index) => (
        <SortableItem
          key={item.id}
          id={item.id}
          content={item.content}
          index={index}
          isDragging={draggedId === item.id}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
          handleDragOver={handleDragOver}
          handleDragEnter={handleDragEnter}
        />
      ))}
    </ul>
  );
};