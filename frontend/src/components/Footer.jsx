import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import jkLogo from "../assets/jk_logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className={`bg-[#2d2a2a] text-white w-full transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between items-start pb-8">
          {/* DIV 1: Company Logo */}
          <div className="mb-8 lg:mb-0 w-full lg:w-2/5">
            <img
              src={jkLogo}
              alt="JK Works Logo"
              className="h-auto w-full max-w-xs md:max-w-sm"
            />
            <p className="text-lg sm:text-xl md:text-2xl text-white mt-4 max-w-xs md:max-w-sm">
              Custom solutions for your unique space with JK WORKS
            </p>
          </div>

          {/* DIV 2: Content - Now with animated logo */}
          <div className="w-full text-white lg:w-3/5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* About Us */}
              <div>
                <h3 className="font-semibold text-xl sm:text-2xl mb-3">
                  About Us
                </h3>
                <ul className="text-xs sm:text-sm space-y-2">
                  <li>
                    <Link
                      to="/interior"
                      className="hover:text-teal-600 transition-colors"
                    >
                      Interior
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/exterior"
                      className="hover:text-teal-600 transition-colors"
                    >
                      Exterior
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/designs"
                      className="hover:text-teal-600 transition-colors"
                    >
                      Design
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/mycourses"
                      className="hover:text-teal-600 transition-colors"
                    >
                      My Courses
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="hover:text-teal-600 transition-colors"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                    >
                      Admin
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="font-semibold text-xl sm:text-2xl mb-3">
                  Support
                </h3>
                <ul className="text-xs sm:text-sm space-y-2">
                  <li>
                    <Link
                      to="/contact"
                      className="hover:text-teal-600 transition-colors"
                    >
                      Contact us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/faqs"
                      className="hover:text-teal-600 transition-colors"
                    >
                      FAQ's
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/care-guide"
                      className="hover:text-teal-600 transition-colors"
                    >
                      Material Care Guide
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/trade-support"
                      className="hover:text-teal-600 transition-colors"
                    >
                      Trade Professional Support
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Social */}
              <div>
                <h3 className="font-semibold text-xl sm:text-2xl mb-3">
                  Social
                </h3>
                <ul className="text-xs sm:text-sm space-y-2">
                  <li>
                    <a
                      href="https://www.instagram.com/j_k_works_?igsh=MWpkYzBudm12NjBudQ=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-teal-600 transition-colors"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-teal-600 transition-colors"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-teal-600 transition-colors"
                    >
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-teal-600 transition-colors"
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>

              {/* Address */}
              <div>
                <h3 className="font-semibold text-xl sm:text-2xl mb-3">
                  Address
                </h3>
                <ul className="text-xs sm:text-sm space-y-2">
                  <li>
                    8101 Pearl Plaza, Unit 4G, Pearl Dr, Ortigas Center, Pasig,
                    Metro Manila
                  </li>
                </ul>
              </div>
            </div>

            {/* Animated JK WORKS Logo */}
            <div className="mt-8 sm:mt-10 md:mt-12">
              <div className="text-right w-full flex flex-col justify-end items-end">
                <div>
                  <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-none">
                    JK
                  </div>
                  <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-wider flex items-center justify-end">
                    W{/* Animated O logo */}
                    <div className="relative inline-flex items-center justify-center mx-1 sm:mx-2">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 border-[4px] sm:border-[5px] md:border-[6px] border-white rounded-full flex items-center justify-center">
                        <div
                          className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 border-[4px] sm:border-[5px] md:border-[6px] border-white rounded-full"
                          style={{ transform: `rotate(${rotation}deg)` }}
                        ></div>
                      </div>
                    </div>
                    RKS
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-white-500 my-4 sm:my-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 space-y-3 sm:space-y-0">
          <div className="text-sm sm:text-base text-white">
            Copyright © {currentYear}All rights reserved By  JK WORKS
          </div>
          <div className="text-sm sm:text-base text-white">  
          Powered By <a href="https://www.zager.in/homepage" className="text-blue-300 hover:underline">Zager Digital Services</a>
          </div>
          <button
            onClick={scrollToTop}
            className="text-sm sm:text-base text-black bg-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-gray-200 transition-colors"
          >
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
