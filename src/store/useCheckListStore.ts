import { create } from 'zustand';

interface ChecklistItem {
  _id: string;
  title: string;
  isCompleted: boolean;
  completedBy?: {
    _id: string;
    name: string;
    imageUrl: string;
  };
}

interface Category {
  _id: string;
  name: string;
  items: ChecklistItem[];
}



interface ChecklistState {
  checklists: Category[];
  isLoading: boolean;

  setChecklist: (v: Category[]) => void
}

export const useChecklistStore = create<ChecklistState>((set) => ({
  checklists: [],
  isLoading: false,

  setChecklist: (data) => set({checklists: data})
}));