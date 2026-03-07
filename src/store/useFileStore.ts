import { create } from "zustand";
type categoryType = "Bookings" | "Tickets" | "Photos" | "Guides" | "TXT" | "DOCUMENTS" | "Other"
interface FileState {
  files: any[];
  isUploading: boolean;
  // State for the "Edit Details" Dialog
  isDialogOpen: boolean;
  tempFileData: any | null; 
  FileCategory: string[];
  activeTab : string;
  selectedFile: File | null,
    isDragging: boolean,
    fileInfo: {name: string, category: categoryType, notes: string}

  setFiles: (files: any[]) => void;
  setUploading: (status: boolean) => void;
  setDialogOpen: (open: boolean) => void;
  setTempFileData: (v: any) => void;
  setActiveTab: (v: string) => void;
  setSelectedFile: (v: File | null) => void
  setIsDragging: (v: boolean) => void
  setFileName: (v: string) => void
  setFileCategory: (v: categoryType) => void
  setFileNotes: (v: string) => void
  clearFileInfo: () => void
}

export const useFileStore = create<FileState>((set) => ({
  files: [],
  isUploading: false,
  isDialogOpen: false,
  tempFileData: null,
  FileCategory: ["All", "Bookings", "Tickets", "Photos", "Guides", "TXT", "DOCUMENTS"],
  activeTab: "All",
  selectedFile: null,
  isDragging: false,

  fileInfo: {name: "", category: "Other", notes: ""},
  setFiles: (files) => set({ files }),
  setUploading: (status) => set({ isUploading: status }),
  setDialogOpen: (open) => set({ 
    isDialogOpen: open,
  }),
  setTempFileData : (v) => set({tempFileData: v}),
  
  setActiveTab: (v) => set({activeTab: v}),
  setSelectedFile: (v) => set({selectedFile: v}),
  setIsDragging: (v) => set({isDragging: v}),

  setFileName: (v) => set((state) => ({fileInfo : {...state.fileInfo, name: v}})),
  setFileCategory: (v) => set((state) => ({fileInfo : {...state.fileInfo, category: v}})),
  setFileNotes: (v) => set((state) => ({fileInfo : {...state.fileInfo, notes: v}})),
  clearFileInfo: () => set({fileInfo: {name: "", category: "Other", notes: ""}}),
}));