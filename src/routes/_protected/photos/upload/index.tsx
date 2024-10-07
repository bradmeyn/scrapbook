import React, { useState, useCallback, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, Upload, X } from "lucide-react";

export const Route = createFileRoute("/_protected/photos/upload/")({
  component: UploadPage,
});

function UploadPage() {
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

  return (
    <div className="space-y-6">
      <a href="/photos/" className="text-rose-500">
        <ArrowLeft size={20} className="inline-block" />
      </a>
      <h1 className="text-3xl font-bold">Upload</h1>

      <div className="bg-white p-6 rounded-lg shadow">
        <div className="mb-6">
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

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Album</h2>
          <select className="w-full p-2 border rounded">
            <option>Select an album</option>
            {/* Populate with user's albums */}
          </select>
        </div>

        <button className="w-full bg-rose-400 text-white py-2 px-4 rounded hover:bg-rose-600 transition-colors">
          Upload Photos
        </button>
      </div>
    </div>
  );
}
