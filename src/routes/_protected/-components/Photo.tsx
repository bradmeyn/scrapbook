import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check, X } from "lucide-react";

export default function Photo({ id, src, alt, onSelect, isSelected }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleImageClick = (e) => {
    if (e.target.closest(".checkbox-container")) return;
    setIsDialogOpen(true);
  };

  return (
    <div className="relative p-3 rounded bg-white border shadow group">
      <img
        className="rounded cursor-pointer transition-opacity duration-300"
        src={src}
        alt={alt}
        onClick={handleImageClick}
      />
      <div
        className={`absolute top-5 left-5 checkbox-container transition-opacity duration-300 ${
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <Checkbox.Root
          className={`flex h-6 w-6 appearance-none rounded-full items-center justify-center border-2 outline-none transition-colors duration-200 ${
            isSelected
              ? "bg-green-500 border-green-500"
              : "bg-white border-white group-hover:border-white"
          }`}
          checked={isSelected}
          onCheckedChange={onSelect}
        >
          <Checkbox.Indicator
            className={isSelected ? "text-white" : "text-gray-600"}
          >
            <Check size={16} />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 flex items-center justify-center">
        <button
          onClick={handleImageClick}
          className="px-3 py-1 bg-white text-gray-800 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          View
        </button>
      </div>
      <ImageViewerDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        src={src}
        alt={alt}
      />
    </div>
  );
}

function ImageViewerDialog({ isOpen, onClose, src, alt }) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 max-w-3xl max-h-[90vh] w-[90vw] overflow-auto">
          <img src={src} alt={alt} className="w-full h-auto" />
          <Dialog.Close asChild>
            <button
              className="absolute top-2 right-2 p-1 rounded-full bg-white text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
