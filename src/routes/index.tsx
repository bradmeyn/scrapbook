import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <header className="flex justify-between py-4">
        <div className="container flex items-center justify-between">
          <Link to="/" className="text-rose-400 font-semibold">
            Scrapbook
          </Link>
        </div>
      </header>
      <main className="flex-1 container">
        <h1 className="text-8xl font-semibold text-center mt-20">
          All your memories in one place
        </h1>
        <Link
          className="bg-rose-500 text-white font-semibold rounded-full px-5 py-2 mx-auto mt-20 flex justify-between items-center gap-2 text-xl w-fit "
          to="/photos"
        >
          <span>Photos</span>
          <ArrowRight size={20} className="inline-block" />
        </Link>
      </main>
      <footer className="text-gray-400 py-4">
        <div className="container text-center text-slate-600">
          <span>&copy; 2024 React</span>
        </div>
      </footer>
    </>
  );
}
