import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="flex justify-between  text-white py-4 w-full">
      <div className="container flex items-center justify-between">
        <Link to="/">
          <span className="font-semibold text-xl text-rose-400">Scrapbook</span>
        </Link>
      </div>
    </header>
  );
}
