import { create } from "zustand";

interface FileState {
  files: any[];
  isUploading: boolean;
  // State for the "Edit Details" Dialog
  isDialogOpen: boolean;
  tempFileData: any | null; 
  
  setFiles: (files: any[]) => void;
  setUploading: (status: boolean) => void;
  setDialogOpen: (open: boolean, data?: any) => void;
  setTempFileData: (v: any) => void;
}

export const useFileStore = create<FileState>((set) => ({
  files: [],
  isUploading: false,
  isDialogOpen: false,
  tempFileData: null,

  setFiles: (files) => set({ files }),
  setUploading: (status) => set({ isUploading: status }),
  setDialogOpen: (open, data = null) => set({ 
    isDialogOpen: open, 
    tempFileData: data 
  }),
  setTempFileData : (v) => set({tempFileData: v})
}));