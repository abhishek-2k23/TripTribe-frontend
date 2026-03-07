import { useFileStore } from "../store/useFileStore";
import { useApi } from "../services/api";
import { toast } from "react-hot-toast";

export const useFileActions = (tripId: string) => {
  const api = useApi();
  const { setFiles, setUploading, setDialogOpen, files, setTempFileData, tempFileData} = useFileStore();

  const handleInitialUpload = async (file: File) => {
    setUploading(true);
    
    const formData = new FormData();
    formData.append("file", file);
    for (const [key, value] of formData.entries()) {
  console.log(key, value); 
}
      const td = toast.loading("uploading")
    try {
      const res = await api.post("/files/upload-raw", formData);
      // Open the detail dialog with the Cloudinary response
      setDialogOpen(true, res.data); 
      setTempFileData(res.data);
      toast.success("Uploaded Successfully", {id: td})
    } catch (error) {
      toast.error("Upload failed", {id: td});
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const saveFileDetails = async (details: { name: string, category: string, notes: string }) => {
    if(!tempFileData){
      return
    }
    try {
      const payload = {
        tripId,
        ...tempFileData,
        ...details
      };

      const res = await api.post("/files/finalize", payload);
      console.log(res.data, files);
      setFiles([res.data, ...files]);
      setDialogOpen(false);
      toast.success("File saved!");
    } catch (error) {
      toast.error("Failed to save details");
    }
  };  

  return { handleInitialUpload, saveFileDetails };
};