import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { CreateAlbumDialog } from "./-components/CreateAlbumDialog";
import { Link } from "@tanstack/react-router";

// Mock function to get albums - replace with actual API call
const getAlbums = async () => {
  // Simulate API call
  return [
    {
      id: 1,
      title: "Vacation 2023",
      coverPhoto:
        "https://images.pexels.com/photos/18638835/pexels-photo-18638835/free-photo-of-fluffy-furry-dog.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      photoCount: 42,
    },
    {
      id: 2,
      title: "Family Reunion",
      coverPhoto:
        "https://images.pexels.com/photos/18638835/pexels-photo-18638835/free-photo-of-fluffy-furry-dog.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      photoCount: 78,
    },
    {
      id: 3,
      title: "Birthday Party",
      coverPhoto:
        "https://images.pexels.com/photos/18638835/pexels-photo-18638835/free-photo-of-fluffy-furry-dog.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      photoCount: 25,
    },
    // Add more mock albums as needed
  ];
};

export const Route = createFileRoute("/_protected/albums/")({
  component: AlbumsPage,
  loader: async () => {
    const albums = await getAlbums();
    return { albums };
  },
});

function AlbumsPage() {
  const { albums } = useLoaderData("/_protected/albums/");

  return (
    <main className="flex-1 container">
      <div className="flex justify-between items-center mb-4 mt-4">
        <h1 className="text-2xl text-slate-600">Albums</h1>
        <CreateAlbumDialog />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {albums.map((album) => (
          <Album key={album.id} {...album} />
        ))}
      </div>
    </main>
  );
}

function Album({ id, title, coverPhoto, photoCount }) {
  return (
    <Link to={`/_protected/albums/${id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <img
          src={coverPhoto}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold text-slate-700 mb-1">{title}</h2>
          <p className="text-sm text-slate-500">{photoCount} photos</p>
        </div>
      </div>
    </Link>
  );
}

export default AlbumsPage;
