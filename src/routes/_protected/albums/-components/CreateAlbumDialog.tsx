import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ReusableDialog } from "@components/ReusableDialog";
import * as Select from "@radix-ui/react-select";

export function CreateAlbumDialog() {
  const [albumName, setAlbumName] = useState("");
  const [albumDescription, setAlbumDescription] = useState("");
  const [albumVisibility, setAlbumVisibility] = useState("");

  const handleOpenChange = (open) => {
    if (!open) {
      // Reset state when dialog is closed
      setAlbumName("");
      setAlbumDescription("");
      setAlbumVisibility("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the album data to your backend
    console.log("Creating album:", {
      albumName,
      albumDescription,
      albumVisibility,
    });
    // Close the dialog or show a success message
  };

  const dialogContent = (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="album-name"
          className="block text-sm font-medium text-gray-700"
        >
          Album Name
        </label>
        <input
          type="text"
          id="album-name"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
          required
        />
      </div>

      <div>
        <label
          htmlFor="album-description"
          className="block text-sm font-medium text-gray-700"
        >
          Description (optional)
        </label>
        <textarea
          id="album-description"
          value={albumDescription}
          onChange={(e) => setAlbumDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-rose-500 focus:border-rose-500"
        />
      </div>

      <div>
        <label
          htmlFor="album-visibility"
          className="block text-sm font-medium text-gray-700"
        >
          Visibility
        </label>
        <Select.Root value={albumVisibility} onValueChange={setAlbumVisibility}>
          <Select.Trigger
            id="album-visibility"
            className="mt-1 inline-flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            <Select.Value placeholder="Select visibility" />
            <Select.Icon>
              <ChevronDown size={16} />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className="overflow-hidden bg-white rounded-md shadow-lg">
              <Select.Viewport className="p-1">
                <Select.Item
                  value="public"
                  className="flex items-center px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-rose-100"
                >
                  <Select.ItemText>Public</Select.ItemText>
                </Select.Item>
                <Select.Item
                  value="private"
                  className="flex items-center px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-rose-100"
                >
                  <Select.ItemText>Private</Select.ItemText>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
          onClick={() => handleOpenChange(false)}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
        >
          Create Album
        </button>
      </div>
    </form>
  );

  return (
    <ReusableDialog
      triggerLabel="Create Album"
      title="Create New Album"
      onOpenChange={handleOpenChange}
    >
      {dialogContent}
    </ReusableDialog>
  );
}

export default CreateAlbumDialog;
