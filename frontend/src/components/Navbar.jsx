import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import jkLogo from "../assets/jk_logo.png";

function NavBar({ projectRef }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const handleProjectsClick = (e) => {
    if (location.pathname === "/" && projectRef && projectRef.current) {
      e.preventDefault();
      projectRef.current.scrollIntoView({ behavior: "smooth" });
      setIsMobileOpen(false);
    }
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/project", label: "PROJECTS" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Blogs" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#2d2a2a]/95 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between text-white">
        
        <Link to="/" className="flex items-center z-50">
          <img
            src="/JK.png"
            alt="JK WORKS Logo"
            className="h-10 w-auto sm:h-12 md:h-14 lg:h-16 object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-sm tracking-wide font-medium uppercase">
          {navLinks.map((link) =>
            link.label === "PROJECTS" && location.pathname === "/" ? (
              <button
                key={link.to}
                className="relative group text-white hover:text-[#f4a079] transition-colors"
                onClick={handleProjectsClick}
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className="relative group text-white hover:text-[#f4a079] transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-white focus:outline-none z-50"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {isMobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Simple Mobile Menu - No Animation */}
      {isMobileOpen && (
        <div className="md:hidden bg-[#2d2a2a]/98 backdrop-blur-lg shadow-xl absolute top-full left-0 w-full px-6 py-6 z-40 text-white">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              link.label === "PROJECTS" && location.pathname === "/" ? (
                <button
                  key={link.to}
                  className="text-base px-4 py-3 text-left hover:bg-[#f4a079]/10 transition-colors uppercase tracking-wide"
                  onClick={handleProjectsClick}
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileOpen(false)}
                  className="block text-base px-4 py-3 hover:bg-[#f4a079]/10 transition-colors uppercase tracking-wide"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default NavBar;
