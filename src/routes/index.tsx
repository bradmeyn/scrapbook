import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <header className="flex justify-between bg-slate-200 text-white py-4">
        <div className="container flex items-center justify-between">
          <Link to="/">
            <span className="font-bold text-xl text-slate-800">
              React-spa-start
            </span>
          </Link>
        </div>
      </header>
      <main className="flex-1 container">
        <Link
          className="bg-emerald-600 text-white rounded-full px-5 py-2 mx-auto mt-20 block text-center w-fit "
          to="/photos"
        >
          Photos
        </Link>
      </main>
      <footer className="bg-slate-300 text-white py-4">
        <div className="container text-center text-slate-600">
          <span>&copy; 2024 React</span>
        </div>
      </footer>
    </>
  );
}
