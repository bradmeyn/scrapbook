import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check, X } from "lucide-react";

type PhotoProps = {
  id: string;
  src: string;
  alt: string;
  onSelect: (id: string, checked: boolean) => void;
  initialSelected?: boolean;
};

export default function Photo({
  id,
  src,
  alt,
  onSelect,
  initialSelected = false,
}: PhotoProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSelected, setIsSelected] = useState<boolean>(initialSelected);

  const handleImageClick = (e) => {
    if (e.target.closest(".checkbox-container")) return;
    setIsDialogOpen(true);
  };

  function handleSelect() {
    setIsSelected((prev) => !prev);
    onSelect(id, checked);
  }

  return (
    <div className="relative bg-white border shadow group cursor-pointer aspect-square hover:opacity-90  overflow-hidden rounded ">
      <Checkbox.Root
        className={`absolute top-4 left-4 size-6 group-hover:block rounded-full border-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 z-10 ${
          isSelected
            ? "bg-rose-500 border-rose-500"
            : "bg-white border-gray-300 hidden"
        }`}
        checked={isSelected}
        onCheckedChange={handleSelect}
      >
        <Checkbox.Indicator className="flex items-center justify-center text-white">
          <Check size={16} />
        </Checkbox.Indicator>
      </Checkbox.Root>

      <img
        className="size-full object-cover hover:scale-110 transition-transform"
        src={src}
        alt={alt}
        onClick={handleImageClick}
      />

      <ImageDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        src={src}
        alt={alt}
      />
    </div>
  );
}

type ImageDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
};

function ImageDialog({ isOpen, onClose, src, alt }: ImageDialogProps) {
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
