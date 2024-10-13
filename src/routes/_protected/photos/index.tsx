import React, { useState } from "react";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { getPhotos } from "@utils/pexels";
import UploadDialog from "./-components/UploadDialog";
import Photo from "../-components/Photo";

export const Route = createFileRoute("/_protected/photos/")({
  component: PhotosPage,
  loader: async () => {
    const data = await getPhotos("dogs");
    return data;
  },
});

function PhotosPage() {
  const { photos } = useLoaderData("/_protected/photos/");
  const [viewPhoto, setViewPhoto] = useState(null);

  const handleEdit = (id) => {
    console.log(`Edit photo with id: ${id}`);
    // Implement edit functionality
  };

  const handleDelete = (id) => {
    console.log(`Delete photo with id: ${id}`);
    // Implement delete functionality
  };

  return (
    <main className="flex-1 container">
      <div className="flex justify-between items-center mb-4 mt-4">
        <h1 className="text-2xl text-slate-600">Photos</h1>
        <UploadDialog />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <Photo
            key={photo.id}
            id={photo.id}
            src={photo.src.medium}
            alt={photo.alt}
            onView={() => setViewPhoto(photo)}
            onEdit={() => handleEdit(photo.id)}
            onDelete={() => handleDelete(photo.id)}
          />
        ))}
      </div>
      {viewPhoto && (
        <ImageViewerDialog
          photo={viewPhoto}
          onClose={() => setViewPhoto(null)}
        />
      )}
    </main>
  );
}
