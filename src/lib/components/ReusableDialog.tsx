import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

type Props = {
  triggerLabel: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  onOpenChange: (open: boolean) => void;
};

export function ReusableDialog({
  triggerLabel,
  title,
  description,
  children,
  onOpenChange,
}: Props) {
  return (
    <Dialog.Root onOpenChange={onOpenChange}>
      <Dialog.Trigger className="text-rose-500">{triggerLabel}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-6 shadow-lg focus:outline-none overflow-y-auto">
          {title ? (
            <Dialog.Title className="text-2xl font-bold mb-4">
              {title}
            </Dialog.Title>
          ) : null}
          {description ? (
            <Dialog.Description className="text-gray-600 mb-4">
              {description}
            </Dialog.Description>
          ) : null}
          {children}
          <Dialog.Close asChild>
            <button
              className="absolute right-4 top-4 inline-flex items-center justify-center rounded-full w-8 h-8 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
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
