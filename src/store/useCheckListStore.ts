import { create } from 'zustand';

interface ChecklistItem {
  _id: string;
  title: string;
  
  completedBy: {
    _id: string;
    name: string;
    imageUrl: string;
  }[];
}

export interface Category {
  _id: string;
  name: string;
  items: ChecklistItem[];
}



interface ChecklistState {
  checklists: Category[];
  isLoading: boolean;

  setChecklist: (v: Category[]) => void
  setLoading: (v: boolean) => void
  updateChecklistItem: (categoryId: string, itemId: string, updatedItem: ChecklistItem) => void;
}

export const useChecklistStore = create<ChecklistState>((set) => ({
  checklists: [],
  isLoading: false,

  setChecklist: (data) => set({checklists: data}),
  setLoading: (v) => set({isLoading: v}),
  
  updateChecklistItem: (categoryId, itemId, updatedItem) => set((state) => ({
    checklists: state.checklists.map((category) => {
      if (category._id === categoryId) {
        return {
          ...category,
          items: category.items.map((item) => 
            item._id === itemId ? updatedItem : item
          ),
        };
      }
      return category;
    }),
  })),
}));