import React from "react";
import { Outlet, createFileRoute, Link } from "@tanstack/react-router";
import { Camera, Album, Home } from "lucide-react";
import Header from "./_protected/-components/Header";

export const Route = createFileRoute("/_protected")({
  component: ProtectedLayout,
});

export default function ProtectedLayout() {
  return (
    <div className="flex flex-col h-screen bg-tremor-background-muted">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-16 bg-white shadow-md">
          <nav className="py-4">
            <ul className="space-y-4">
              <NavItem
                href="/home"
                icon={<Home size={20} />}
                tooltip="Dashboard"
              />
              <NavItem
                href="/photos"
                icon={<Camera size={20} />}
                tooltip="Photos"
              />
              <NavItem
                href="/albums"
                icon={<Album size={20} />}
                tooltip="Albums"
              />
            </ul>
          </nav>
        </aside>
        <main className="flex-1 overflow-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function NavItem({ href, icon, tooltip }) {
  return (
    <li className="flex justify-center">
      <Link
        to={href}
        className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors group relative"
        activeProps={{
          className: "bg-blue-100 text-blue-700",
        }}
      >
        {icon}
        <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {tooltip}
        </span>
      </Link>
    </li>
  );
}
