import React, { useState } from 'react';
import { ShoppingListItem } from '../types';

interface ListActionsProps {
    items: ShoppingListItem[];
    onClearCompleted: () => void;
}

const ListActions: React.FC<ListActionsProps> = ({ items, onClearCompleted }) => {
    const [copyButtonText, setCopyButtonText] = useState('Listeyi Kopyala');
    
    const completedCount = items.filter(item => item.completed).length;

    const handleCopyList = () => {
        let listText = "Bugünün Alışveriş Listesi 😊\n\n";
        items.forEach(item => {
            listText += `- ${item.name}\n`;
        });

        navigator.clipboard.writeText(listText.trim()).then(() => {
            setCopyButtonText('Kopyalandı!');
            setTimeout(() => setCopyButtonText('Listeyi Kopyala'), 2000);
        }).catch(err => {
            console.error('Failed to copy list: ', err);
            setCopyButtonText('Hata!');
            setTimeout(() => setCopyButtonText('Listeyi Kopyala'), 2000);
        });
    };

    if (items.length === 0) {
        return null;
    }

    return (
        <div className="mt-6 pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-end items-center gap-4">
             <button
                onClick={handleCopyList}
                className="w-full sm:w-auto text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors px-4 py-2 rounded-lg hover:bg-blue-100"
            >
                {copyButtonText}
            </button>
            {completedCount > 0 && (
                 <button
                    onClick={onClearCompleted}
                    className="w-full sm:w-auto text-sm font-semibold text-red-600 hover:text-red-800 transition-colors px-4 py-2 rounded-lg hover:bg-red-100"
                >
                    Tamamlananları Temizle ({completedCount})
                </button>
            )}
        </div>
    );
};

export default ListActions;