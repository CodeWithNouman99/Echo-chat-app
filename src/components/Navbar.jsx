import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="h-16 border-b border-stone-200 bg-white px-6 md:px-12">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-900">
            <span className="text-sm font-semibold text-amber-500">E</span>
          </div>
          <h1 className="text-lg font-semibold tracking-tight text-stone-900">
            Echo <span className="text-amber-600">Chat</span>
          </h1>
        </div>

        {/* User */}
        <button className="text-2xl text-stone-400 transition hover:text-stone-900">
          <FaRegCircleUser />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;