import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// import jkLogo from "../assets/jk_logo.png"; // Import your logo image

function NavBar({ projectRef }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // Scroll to Projects section on Home page
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
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between text-white"> {/* Reduced py-4 to py-3 */}
        
        {/* PNG Logo for Navbar - Replacing animated text logo */}
        <Link to="/" className="flex items-center">
          <img
            src="/JK.png"
            alt="JK WORKS Logo"
            className="h-10 w-auto sm:h-12 md:h-14 lg:h-16 object-contain transition-transform duration-300 hover:scale-105"
            style={{ 
              maxWidth: '100px', // Maximum width constraint
              height: '50px'
            }}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-sm tracking-wide font-medium uppercase">
          {navLinks.map((link) =>
            link.label === "PROJECTS" && location.pathname === "/" ? (
              <button
                key={link.to}
                className="relative group text-white hover:text-[#f4a079] transition-colors bg-transparent border-none outline-none cursor-pointer"
                onClick={handleProjectsClick}
                style={{ padding: 0, background: "none" }}
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#f4a079] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className="relative group text-white hover:text-[#f4a079] transition-colors"
                onClick={link.label === "PROJECTS" ? () => setIsMobileOpen(false) : undefined}
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#f4a079] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )
          )}
        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            {isMobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="md:hidden bg-[#2d2a2a]/95 backdrop-blur-lg shadow-xl absolute top-full left-0 w-full px-6 py-6 z-40 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) =>
                link.label === "PROJECTS" && location.pathname === "/" ? (
                  <button
                    key={link.to}
                    className="text-base px-4 py-2 rounded hover:bg-[#f4a079]/10 transition-all uppercase tracking-wide text-left bg-transparent border-none outline-none cursor-pointer"
                    onClick={(e) => {
                      handleProjectsClick(e);
                    }}
                  >
                    {link.label}
                  </button>
                ) : (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-base px-4 py-2 rounded hover:bg-[#f4a079]/10 transition-all uppercase tracking-wide"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default NavBar;
