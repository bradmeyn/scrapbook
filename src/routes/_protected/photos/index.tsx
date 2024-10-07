import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { getPhotos } from "../../../lib/utils/pexels";

export const Route = createFileRoute("/_protected/photos/")({
  component: PhotosPage,
  loader: async () => {
    // The loader should be an async function
    const data = await getPhotos("cavoodles");
    return data; // Return an object with the data
  },
});

function PhotosPage() {
  const { photos } = useLoaderData("/_protected/photos/"); // Destructure the data returned by the loader

  return (
    <main className="flex-1 container">
      <div className="flex justify-between items-center mb-2 mt-4">
        <h1 className="text-2xl text-slate-600 ">Photos</h1>
        <a href="/photos/upload" className="text-rose-500">
          Upload
        </a>
      </div>
      <div className="flex gap-2">
        {photos.map((photo) => (
          <Photo key={photo.id} src={photo.src.medium} alt={photo.alt} />
        ))}
      </div>
    </main>
  );
}

function Photo({ id, src, alt }) {
  return (
    <div className="p-3 rounded bg-white w-fit border  shadow">
      <img className="rounded" src={src} alt={alt} />
    </div>
  );
}
