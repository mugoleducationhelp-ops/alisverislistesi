import React, { useState } from 'react';
import { getShoppingListSuggestions } from '../services/geminiService';
import { SuggestedItem } from '../types';

interface GeminiSuggestionProps {
    onAddSuggestedItems: (items: SuggestedItem[]) => void;
}

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 2a1 1 0 00-1 1v1.586l-1.293 1.293a1 1 0 101.414 1.414L5 6.414V8a1 1 0 002 0V6.414l.293.293a1 1 0 101.414-1.414L7 4.586V3a1 1 0 00-2 0V1.5a1 1 0 00-1-1zM10 2a1 1 0 00-1 1v1.586l-1.293 1.293a1 1 0 101.414 1.414L10 6.414V8a1 1 0 002 0V6.414l.293.293a1 1 0 101.414-1.414L12 4.586V3a1 1 0 00-2 0V1.5a1 1 0 00-1-1zM15 2a1 1 0 00-1 1v1.586l-1.293 1.293a1 1 0 101.414 1.414L15 6.414V8a1 1 0 002 0V6.414l.293.293a1 1 0 101.414-1.414L17 4.586V3a1 1 0 00-2 0V1.5a1 1 0 00-1-1zM5 10a1 1 0 00-1 1v1.586l-1.293 1.293a1 1 0 101.414 1.414L5 14.414V16a1 1 0 002 0v-1.586l.293.293a1 1 0 101.414-1.414L7 12.586V11a1 1 0 00-2 0v-1.5a1 1 0 00-1-1zM10 10a1 1 0 00-1 1v1.586l-1.293 1.293a1 1 0 101.414 1.414L10 14.414V16a1 1 0 002 0v-1.586l.293.293a1 1 0 101.414-1.414L12 12.586V11a1 1 0 00-2 0v-1.5a1 1 0 00-1-1zM15 10a1 1 0 00-1 1v1.586l-1.293 1.293a1 1 0 101.414 1.414L15 14.414V16a1 1 0 002 0v-1.586l.293.293a1 1 0 101.414-1.414L17 12.586V11a1 1 0 00-2 0v-1.5a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
);


const GeminiSuggestion: React.FC<GeminiSuggestionProps> = ({ onAddSuggestedItems }) => {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSuggestion = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            const suggestions = await getShoppingListSuggestions(prompt);
            if (suggestions) {
                onAddSuggestedItems(suggestions);
                setPrompt('');
            } else {
                setError('Gemini\'den öneri alınamadı. Lütfen tekrar deneyin.');
            }
        } catch (err) {
            setError('Bir hata oluştu. API anahtarınızı kontrol edin veya daha sonra tekrar deneyin.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-gradient-to-br from-emerald-50 to-teal-100 p-5 rounded-lg">
            <label htmlFor="gemini-prompt" className="block text-sm font-bold text-slate-700 mb-2">
                AI Destekli Öneri
            </label>
            <p className="text-sm text-slate-600 mb-3">Ne yapmak istersiniz? Örneğin: "Tavuklu makarna" veya "Haftalık kahvaltılıklar"</p>
            <form onSubmit={handleSuggestion} className="flex items-center gap-2">
                <input
                    id="gemini-prompt"
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="İsteğinizi yazın..."
                    className="flex-grow p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="bg-teal-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-600 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center gap-2"
                    disabled={isLoading || !prompt.trim()}
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Oluşturuluyor...</span>
                        </>
                    ) : (
                        <>
                            <SparklesIcon />
                            <span>Öneri Al</span>
                        </>
                    )}
                </button>
            </form>
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>
    );
};

export default GeminiSuggestion;