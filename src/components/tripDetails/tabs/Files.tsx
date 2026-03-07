import { useFileStore } from "@/store/useFileStore";
import { useFileActions } from "@/hooks/useFile";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadCloud, FileText, X, Loader2 } from "lucide-react";
import { FileDetailDialog } from "../files/FileDetailsDialog";
import { FileCard } from "../files/FileCard";

const CATEGORIES = ["All", "Bookings", "Tickets", "Photos", "Guides", "TXT", "DOCUMENTS"];

export default function File() {
  const { files, isUploading } = useFileStore();
  const { handleInitialUpload } = useFileActions();
  const setIsDragging = useFileStore((s) => s.setIsDragging);
  const setSelectedFile = useFileStore((s) => s.setSelectedFile);
  const selectedFile = useFileStore((s) => s.selectedFile);
  const activeTab = useFileStore((s) => s.activeTab);
  const isDragging = useFileStore((s) => s.isDragging);
  const setActiveTab = useFileStore((s) => s.setActiveTab);

  // 1. Handle Drag Events
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const clearSelection = () => setSelectedFile(null);

  const triggerUpload = () => {
    if (selectedFile) {
      handleInitialUpload(selectedFile);
      
    }
  };

  const filteredFiles = activeTab === "All" 
    ? files 
    : files.filter(f => f.category === activeTab);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trip Files & Documents</h1>
          <p className="text-muted-foreground">Manage all your bookings and trip assets</p>
        </div>
        <Button 
          onClick={triggerUpload}
          disabled={!selectedFile || isUploading}
          className="bg-orange-500 hover:bg-orange-600 rounded-full px-6 transition-all active:scale-95"
        >
          {isUploading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <UploadCloud className="mr-2 h-4 w-4" />
          )}
          {isUploading ? "Uploading..." : "Upload File"}
        </Button>
      </div>

      {/* Drag & Drop Area */}
      <div 
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`border-2 border-dashed rounded-3xl p-12 transition-all duration-200 flex flex-col items-center justify-center text-center space-y-4 ${
          isDragging ? "border-orange-400 bg-orange-50/50" : "border-blue-100 bg-blue-50/30"
        } ${selectedFile ? "border-green-200 bg-green-50/20" : ""}`}
      >
        {!selectedFile ? (
          <>
            <div className="bg-blue-100 p-4 rounded-full">
              <UploadCloud className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Drag and drop files here</h3>
              <p className="text-sm text-muted-foreground">
                or click to browse from your computer (PDF, JPG, PNG, XLSX)
              </p>
            </div>
            <div className="relative">
              <Button variant="secondary" className="bg-blue-100/50 text-blue-700 hover:bg-blue-100">
                Select Files
              </Button>
              <input 
                type="file" 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={handleFileChange}
              />
            </div>
          </>
        ) : (
          /* 2. File Selected Preview UI */
          <div className="flex flex-col items-center space-y-3 animate-in fade-in zoom-in duration-300">
            <div className="relative">
              <div className="bg-green-100 p-4 rounded-2xl">
                <FileText className="h-10 w-10 text-green-600" />
              </div>
              <button 
                onClick={clearSelection}
                className="absolute -top-2 -right-2 bg-white border shadow-sm rounded-full p-1 hover:text-red-500 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div>
              <p className="font-semibold text-slate-800">{selectedFile.name}</p>
              <p className="text-xs text-slate-500">{(selectedFile.size / 1024).toFixed(1)} KB • Ready to upload</p>
            </div>
          </div>
        )}
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="All" onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-transparent gap-4">
          {CATEGORIES.map(cat => (
            <TabsTrigger 
              key={cat} 
              value={cat}
              className="rounded-full px-6 border data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all"
            >
              {cat}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Files Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredFiles.map((file) => (
          <FileCard key={file._id} file={file} />
        ))}
      </div>

      {/* Detail Dialog Popup - Should clear selection when saved successfully */}
      <FileDetailDialog  />
    </div>
  );
}