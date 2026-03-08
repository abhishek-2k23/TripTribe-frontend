import { useFileStore } from "../store/useFileStore";
import { useApi } from "../services/api";
import { toast } from "react-hot-toast";
import useTripDetailsStore from "@/store/useTripDetails";

export const useFileActions = () => {
  const api = useApi();
  const tripId = useTripDetailsStore((s) => s.selectedTripId)
  const { setFiles, setUploading, setDialogOpen, files, setTempFileData, tempFileData, setSelectedFile, setFileName, clearFileInfo, fileInfo} = useFileStore();

  const handleInitialUpload = async (file: File) => {
    setUploading(true);
    
    const formData = new FormData();
    formData.append("file", file);
    for (const [key, value] of formData.entries()) {
  console.log(key, value); 
}
      const td = toast.loading("uploading")
    try {
      const res:any = await api.post("/files/upload-raw", formData);
      // Open the detail dialog with the Cloudinary response
      
      setFileName(res.data.originalName);
      setDialogOpen(true); 
      setTempFileData(res.data);
      toast.success("Uploaded Successfully", {id: td})
    } catch (error:any) {
      toast.error("Upload failed", {id: td});
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const saveFileDetails = async () => {
    if(!tempFileData){
      return
    }
    try {
      const payload = {
        tripId,
        ...tempFileData,
        ...fileInfo
      };

      const res:any = await api.post("/files/finalize", payload);
      if(res.success){
      setFiles([res.data, ...files]);
      setDialogOpen(false);
      setSelectedFile(null);
      clearFileInfo();
      toast.success("File saved!");
      }
    } catch (error: any) {
      toast.error(error?.message || "Failed to save details");
    }
  };  

   const handlePreview = (url: string) => {
    // Opens the Cloudinary URL in a new tab for native browser viewing
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleDownload = async (url: string, name: string) => {
    try {
      // Fetching as a blob forces the browser to treat it as data rather than a webpage
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = name || "Trip File Download"; // Uses the user-defined name from your DB
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return { handleInitialUpload, saveFileDetails, handlePreview, handleDownload };
};