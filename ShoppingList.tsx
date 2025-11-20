import React, { useRef, useEffect } from 'react';
import { ShoppingListItem } from '../types';

interface ShoppingListProps {
  items: ShoppingListItem[];
  editingId: number | null;
  onToggleItem: (id: number) => void;
  onRemoveItem: (id: number) => void;
  onSetEditingId: (id: number | null) => void;
  onEditItem: (id: number, newName: string) => void;
}

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);


const ShoppingList: React.FC<ShoppingListProps> = ({ items, editingId, onToggleItem, onRemoveItem, onSetEditingId, onEditItem }) => {
  const editInputRef = useRef<HTMLInputElement>(null);
  
  const today = new Date().toLocaleDateString('tr-TR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });


  useEffect(() => {
    if (editingId !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingId]);

  if (items.length === 0) {
    return (
      <div className="text-center py-10 px-4">
        <p className="text-gray-500">Alışveriş listeniz şimdilik boş. 📝</p>
        <p className="text-sm text-gray-400 mt-2">Başlamak için yukarıdan bir ürün ekleyin.</p>
      </div>
    );
  }

  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id: number) => {
    if (e.key === 'Enter') {
        onEditItem(id, e.currentTarget.value);
    } else if (e.key === 'Escape') {
        onSetEditingId(null);
    }
  };

  return (
    <div>
      <h2 className="text-sm font-bold text-blue-800 border-b-2 border-gray-200 pb-2 mb-3 tracking-wider uppercase">
        {today}
      </h2>
      <ul className="space-y-2">
        {items.map(item => (
          <li
            key={item.id}
            className="group flex items-center bg-white p-3 rounded-lg transition-all duration-200 hover:bg-blue-50"
          >
            <input
                type="checkbox"
                checked={item.completed}
                onChange={() => onToggleItem(item.id)}
                className="h-5 w-5 rounded border-gray-300 text-blue-700 focus:ring-blue-500 cursor-pointer flex-shrink-0"
                aria-labelledby={`item-name-${item.id}`}
            />
            <div className="flex-grow ml-4">
                {editingId === item.id ? (
                    <input
                        ref={editInputRef}
                        type="text"
                        defaultValue={item.name}
                        onBlur={(e) => onEditItem(item.id, e.target.value)}
                        onKeyDown={(e) => handleEditKeyDown(e, item.id)}
                        className="w-full px-1 py-0.5 border-b-2 border-blue-700 bg-white text-gray-900 focus:outline-none"
                    />
                ) : (
                    <span
                        id={`item-name-${item.id}`}
                        onClick={() => onSetEditingId(item.id)}
                        className={`text-gray-800 transition-all duration-300 cursor-pointer ${
                        item.completed ? 'line-through text-gray-400' : ''
                        }`}
                    >
                        {item.name}
                    </span>
                )}
            </div>
            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onSetEditingId(item.id)}
                  className="p-2 text-gray-400 hover:text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
                  aria-label={`'${item.name}' ürününü düzenle`}
                >
                  <EditIcon />
                </button>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-100 transition-colors"
                  aria-label={`'${item.name}' ürününü sil`}
                >
                  <TrashIcon />
                </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;