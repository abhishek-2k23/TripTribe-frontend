import { 
  MoreVertical, 
  FileText, 
  Image as ImageIcon, 
  Film, 
  FileSpreadsheet, 
  Eye, 
  Download 
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useFileActions } from "@/hooks/useFile";

const getFileIcon = (type: string = "") => {
  const t = type.toLowerCase();
  if (t.includes("image") || ["jpg", "jpeg", "png", "webp"].includes(t)) 
    return <ImageIcon className="h-6 w-6 text-orange-500" />;
  if (t.includes("pdf")) 
    return <FileText className="h-6 w-6 text-red-500" />;
  if (t.includes("sheet") || t.includes("excel") || ["xls", "xlsx", "csv"].includes(t)) 
    return <FileSpreadsheet className="h-6 w-6 text-green-500" />;
  if (t.includes("video") || t.includes("mp4")) 
    return <Film className="h-6 w-6 text-purple-500" />;
  return <FileText className="h-6 w-6 text-blue-500" />;
};

export function FileCard({ file }: { file: any }) {
   const {handleDownload, handlePreview} = useFileActions();
   
  return (
    <div className="bg-white border rounded-3xl p-6 shadow-sm flex flex-col justify-between h-64 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-xl ${file?.fileExtension?.includes('pdf') ? 'bg-red-50' : 'bg-blue-50'}`}>
          {getFileIcon(file.fileExtension || file.fileType)}
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-slate-400 outline-none focus:ring-0">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 rounded-xl shadow-lg border-slate-100 bg-white">
            <DropdownMenuItem onClick={handlePreview} className="cursor-pointer py-2">
              <Eye className="mr-2 h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium">Preview</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDownload} className="cursor-pointer py-2">
              <Download className="mr-2 h-4 w-4 text-slate-500" />
              <span className="text-sm font-medium">Download</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-1">
        <h4 className="font-bold text-slate-800 truncate" title={file.name}>
          {file.name}
        </h4>
        <p className="text-xs text-slate-400">
          {new Date(file.createdAt).toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
          })} 
          • {(file.size / 1024).toFixed(1)} KB
        </p>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-slate-50">
        <Avatar className="h-6 w-6">
          <AvatarImage src={file.uploadedBy?.imageUrl} />
          <AvatarFallback className="bg-slate-100 text-[10px]">
            {file.uploadedBy?.name?.[0]}
          </AvatarFallback>
        </Avatar>
        <span className="text-xs font-medium text-slate-600 truncate">
          {file.uploadedBy?.name}
        </span>
      </div>
    </div>
  );
}