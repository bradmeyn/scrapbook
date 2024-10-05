import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="flex justify-between bg-slate-700 text-white py-4 w-full">
      <div className="container flex items-center justify-between">
        <Link to="/">
          <span className="font-bold text-xl text-green-800">Scrapbook</span>
        </Link>
      </div>
    </header>
  );
}
