import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion"; 

function NavBar({ projectRef }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const location = useLocation();

  // Track cursor position
  useEffect(() => {
    const updateCursorPosition = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateCursorPosition);
    window.addEventListener("touchmove", (e) => {
      // For touch devices, get the first touch point
      if (e.touches.length > 0) {
        updateCursorPosition({
          clientX: e.touches[0].clientX,
          clientY: e.touches[0].clientY,
        });
      }
    });

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
      window.removeEventListener("touchmove", updateCursorPosition);
    };
  }, []);

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
    { to: "/project", label: "Projects", onClick: handleProjectsClick },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Blogs" },
    { to: "/courses", label: "My Courses" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#2d2a2a]/95 backdrop-blur-md shadow-lg">
      {/* Custom cursor animation - follows mouse/touch */}
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-[#f4a079]/60 pointer-events-none z-50 mix-blend-screen"
        style={{
          left: cursorPosition.x - 12,
          top: cursorPosition.y - 12,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "loop"
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">
        {/* Logo */}
        <Link to="/" className="text-2xl md:text-3xl font-bold tracking-tight">
          <span className="font-serif">JK</span>
          <span className="text-[#c99e70] font-sans"> WORKS</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-sm tracking-wide font-medium uppercase">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="relative group text-white hover:text-[#f4a079] transition-colors"
              onClick={link.label === "Projects" ? link.onClick : undefined}
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#f4a079] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
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
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={link.label === "Projects" ? link.onClick : () => setIsMobileOpen(false)}
                  className="text-base px-4 py-2 rounded hover:bg-[#f4a079]/10 transition-all uppercase tracking-wide"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-[#f4a079] transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default NavBar;