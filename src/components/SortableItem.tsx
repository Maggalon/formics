import React from 'react';

interface SortableItemProps {
  id: string;
  content: string;
  index: number;
  isDragging: boolean;
  handleDragStart: (e: React.DragEvent<HTMLLIElement>, id: string) => void;
  handleDragEnd: () => void;
  handleDragOver: (e: React.DragEvent<HTMLLIElement>) => void;
  handleDragEnter: (e: React.DragEvent<HTMLLIElement>, id: string) => void;
}

export const SortableItem: React.FC<SortableItemProps> = ({
  id,
  content,
  index,
  isDragging,
  handleDragStart,
  handleDragEnd,
  handleDragOver,
  handleDragEnter,
}) => {
  return (
    <li
      draggable
      onDragStart={(e) => handleDragStart(e, id)}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragEnter={(e) => handleDragEnter(e, id)}
      className={`flex items-center gap-3 p-4 bg-white/70 rounded-lg shadow-sm cursor-move transition-all duration-200 ${
        isDragging
          ? 'opacity-50 scale-105 shadow-md'
          : 'opacity-100 hover:shadow-md'
      }`}
    >
    
      <span className="text-sm font-medium text-gray-500 flex-none">{index + 1}</span>
      <span className="text-gray-700 flex-1">{content}</span>
      <svg
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
        className='text-gray-600 h-5 w-5 flex-none'
        >
        <path d="M10 12 A1 1 0 0 1 9 13 A1 1 0 0 1 8 12 A1 1 0 0 1 10 12 z" />
        <path d="M10 5 A1 1 0 0 1 9 6 A1 1 0 0 1 8 5 A1 1 0 0 1 10 5 z" />
        <path d="M10 19 A1 1 0 0 1 9 20 A1 1 0 0 1 8 19 A1 1 0 0 1 10 19 z" />
        <path d="M16 12 A1 1 0 0 1 15 13 A1 1 0 0 1 14 12 A1 1 0 0 1 16 12 z" />
        <path d="M16 5 A1 1 0 0 1 15 6 A1 1 0 0 1 14 5 A1 1 0 0 1 16 5 z" />
        <path d="M16 19 A1 1 0 0 1 15 20 A1 1 0 0 1 14 19 A1 1 0 0 1 16 19 z" />
      </svg>
    </li>
  );
};