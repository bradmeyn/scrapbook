import { useState, useCallback, useEffect } from "react";
import { Upload, X, ChevronDown } from "lucide-react";
import { ReusableDialog } from "@components/ReusableDialog";
import * as Select from "@radix-ui/react-select";

export function UploadDialog() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState("");

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
      setSelectedAlbum("");
    }
  };

  const dialogContent = (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-2">Select Photos</h2>
        <div
          className={`border-2 border-dashed rounded-lg p-8 min-h-60 flex items-center justify-center text-center cursor-pointer transition-colors ${
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
        <Select.Root value={selectedAlbum} onValueChange={setSelectedAlbum}>
          <Select.Trigger className="inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500">
            <Select.Value placeholder="Select an album" />
            <Select.Icon>
              <ChevronDown size={16} />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg">
              <Select.Viewport className="p-1">
                <Select.Item
                  value="album1"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-rose-100"
                >
                  <Select.ItemText>Album 1</Select.ItemText>
                </Select.Item>
                <Select.Item
                  value="album2"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-rose-100"
                >
                  <Select.ItemText>Album 2</Select.ItemText>
                </Select.Item>
                {/* Add more album options as needed */}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
          Cancel
        </button>
        <button className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors">
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
