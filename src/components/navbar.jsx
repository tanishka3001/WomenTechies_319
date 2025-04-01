import React from 'react';

export default function Navbar() {
  return (
    <nav className="bg-[#89A8B2] p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="text-white text-2xl font-bold">
          <a href="/">Code to UI</a> {/* Home link */}
        </div>

        {/* Navbar Links */}
        <div className="hidden md:flex space-x-6">
          <a href="/" className="text-white hover:text-gray-200">Home</a>
          <a href="#about" className="text-white hover:text-gray-200">About</a>
          <a href="#contact" className="text-white hover:text-gray-200">Contact</a>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <button className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (hidden by default, show on click) */}
      <div className="md:hidden bg-blue-700 p-4 space-y-4">
        <a href="/" className="text-white block">Home</a>
        <a href="/about" className="text-white block">About</a>
        <a href="/contact" className="text-white block">Contact</a>
      </div>
    </nav>
  );
}
