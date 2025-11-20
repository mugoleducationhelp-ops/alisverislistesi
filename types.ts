export interface ShoppingListItem {
  id: number;
  name: string;
  completed: boolean;
}

// FIX: Add SuggestedItem interface to be used by Gemini service and suggestion component.
export interface SuggestedItem {
  name: string;
  category: string;
}
