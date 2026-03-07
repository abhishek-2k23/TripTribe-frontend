import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UploadCloud, ImageIcon, Loader2, X } from "lucide-react";
import { toast } from "react-hot-toast";

interface CoverImageDialogProps {
  currentCover?: string;
  onUpdate: (newUrl: string) => Promise<void>;
}

export function CoverImageDialog({ currentCover, onUpdate }: CoverImageDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    const toastId = toast.loading("Uploading new cover...");

    try {
      // 1. Upload to your existing raw-upload route
      const formData = new FormData();
      formData.append("file", selectedFile);
      
      // Assuming 'api' is your useApi hook instance
      const res: any = await api.post("/files/upload-raw", formData);
      const newCloudinaryUrl = res.data.url;

      // 2. Call the update function passed from Settings page
      await onUpdate(newCloudinaryUrl);
      
      toast.success("Cover updated!", { id: toastId });
      setIsOpen(false);
      setSelectedFile(null);
    } catch (error) {
      toast.error("Failed to update cover", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <ImageIcon className="h-4 w-4" /> Change Cover
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-3xl">
        <DialogHeader>
          <DialogTitle>Update Cover Image</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="relative group aspect-[3/1] rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center">
            {previewUrl || currentCover ? (
              <>
                <img 
                  src={previewUrl || currentCover} 
                  className="w-full h-full object-cover" 
                  alt="Cover preview" 
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <p className="text-white text-sm font-medium">Preview</p>
                </div>
              </>
            ) : (
              <div className="text-slate-400 flex flex-col items-center">
                <UploadCloud className="h-8 w-8 mb-2" />
                <p className="text-xs">No image selected</p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Button variant="secondary" className="w-full cursor-pointer">
                {selectedFile ? "Change Selection" : "Select Image"}
              </Button>
              <input 
                type="file" 
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer" 
                onChange={handleFileChange}
              />
            </div>
            {selectedFile && (
               <Button 
                onClick={handleUpload} 
                disabled={isUploading}
                className="bg-orange-500 hover:bg-orange-600 px-8"
               >
                {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}