import { useState, useCallback, useEffect } from "react";
import { Upload, X } from "lucide-react";
import { ReusableDialog } from "@components/ReusableDialog";

export function UploadDialog() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleChange = useCallback((e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFiles(Array.from(e.target.files));
    }
  }, []);

  const removeFile = useCallback((index) => {
    setFiles((files) => files.filter((_, i) => i !== index));
  }, []);

  useEffect(() => {
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);

    return () => newPreviews.forEach(URL.revokeObjectURL);
  }, [files]);

  const handleOpenChange = (open) => {
    if (!open) {
      // Reset state when dialog is closed
      setFiles([]);
      setPreviews([]);
      setDragActive(false);
    }
  };

  const dialogContent = (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Select Photos</h2>
        <div
          className={`border-2 border-dashed rounded-lg p-8 min-h-60 text-center cursor-pointer transition-colors ${
            dragActive
              ? "border-rose-500 bg-rose-50"
              : "border-gray-300 hover:border-rose-500"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            onChange={handleChange}
            className="hidden"
            id="file-upload"
            accept="image/*"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 text-xl">
              Drag and drop your images here, or click to select files
            </p>
          </label>
        </div>
        {files.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold mb-2">Selected files:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} className="text-rose-500" />
                  </button>
                  <p className="text-sm mt-1 truncate">{files[index].name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Album</h2>
        <select className="w-full p-2 border rounded">
          <option>Select an album</option>
          {/* Populate with user's albums */}
        </select>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
          Cancel
        </button>
        <button className="px-4 py-2 bg-rose-400 text-white rounded hover:bg-rose-600 transition-colors">
          Upload
        </button>
      </div>
    </div>
  );

  return (
    <ReusableDialog
      triggerLabel="Upload"
      title="Upload Photos"
      onOpenChange={handleOpenChange}
    >
      {dialogContent}
    </ReusableDialog>
  );
}

export default UploadDialog;
