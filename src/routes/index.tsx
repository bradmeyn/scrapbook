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
        <h1 className="text-4xl mx-auto w-full text-center mt-20">
          Get Started
        </h1>
      </main>
      <footer className="bg-slate-300 text-white py-4">
        <div className="container text-center text-slate-600">
          <span>&copy; 2024 React</span>
        </div>
      </footer>
    </>
  );
}
