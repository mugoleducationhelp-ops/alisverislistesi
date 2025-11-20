import React, { useState, useEffect } from 'react';
import { ShoppingListItem } from './types';
import Header from './components/Header';
import ShoppingList from './components/ShoppingList';
import AddItemForm from './components/AddItemForm';
import ListActions from './components/ListActions';

const App: React.FC = () => {
  const [items, setItems] = useState<ShoppingListItem[]>(() => {
    try {
      const localData = localStorage.getItem('shoppingListItems');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error("Could not parse local storage data:", error);
      return [];
    }
  });
  
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('shoppingListItems', JSON.stringify(items));
  }, [items]);

  const handleAddItem = (name: string) => {
    if (name.trim() === '') return;
    const maxId = items.reduce((max, item) => Math.max(item.id, max), 0);
    const newItem: ShoppingListItem = {
      id: maxId + 1,
      name: name.trim(),
      completed: false,
    };
    setItems(prevItems => [...prevItems, newItem]);
  };

  const handleToggleItem = (id: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };
  
  const handleEditItem = (id: number, newName: string) => {
    setItems(prevItems => prevItems.map(item =>
      item.id === id ? { ...item, name: newName.trim() } : item
    ));
    setEditingId(null);
  };

  const handleRemoveItem = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const handleClearCompleted = () => {
    setItems(prevItems => prevItems.filter(item => !item.completed));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <main className="bg-white rounded-lg shadow-xl p-6 mt-8">
          <AddItemForm onAddItem={handleAddItem} />
          <div className="my-6 border-b border-gray-200"></div>
          <ShoppingList
            items={items}
            editingId={editingId}
            onToggleItem={handleToggleItem}
            onRemoveItem={handleRemoveItem}
            onSetEditingId={setEditingId}
            onEditItem={handleEditItem}
          />
          <ListActions 
            items={items}
            onClearCompleted={handleClearCompleted}
          />
        </main>
      </div>
      <footer className="text-center mt-10 text-gray-500 text-sm">
        <p>MuGöl EDUCATION tarafından yapılmıştır</p>
      </footer>
    </div>
  );
};

export default App;