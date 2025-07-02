import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import jkLogo from '../assets/jk_logo.png'; 

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-[#2d2a2a] text-white w-full">
      <div className="mx-auto px-6 lg:px-12 py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start pb-8">
          {/* DIV 1: Company Logo - 40% width */}
          <div className="mb-6 md:mb-0 w-full md:w-2/5">
            <img 
              src={jkLogo}
              alt="JK Works Logo"
              className="h-50 w-auto"
            />
            <p className="text-2xl text-white mt-4 max-w-xs">
              Custom solutions for your unique space with JK WORKS
            </p>
          </div>

          {/* DIV 2: Content - Now with animated logo */}
          <div className="w-full text-white md:w-3/5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* About Us */}
              <div>
                <h3 className="font-semibold text-2xl mb-3">About Us</h3>
                <ul className="text-xs space-y-2">
                  <li><Link to="/interior" className="hover:text-teal-600 transition-colors">Interior</Link></li>
                  <li><Link to="/exterior" className="hover:text-teal-600 transition-colors">Exterior</Link></li>
                  <li><Link to="/design" className="hover:text-teal-600 transition-colors">Design</Link></li>
                  <li><Link to="/mycourses" className="hover:text-teal-600 transition-colors">My Courses</Link></li>
                  <li><Link to="/login" className="hover:text-teal-600 transition-colors">Admin</Link></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="font-semibold text-2xl mb-3">Support</h3>
                <ul className="text-xs space-y-2">
                  <li><Link to="/contact" className="hover:text-teal-600 transition-colors">Contact us</Link></li>
                  <li><Link to="/faqs" className="hover:text-teal-600 transition-colors">FAQ's</Link></li>
                  <li><Link to="/care-guide" className="hover:text-teal-600 transition-colors">Material Care Guide</Link></li>
                  <li><Link to="/trade-support" className="hover:text-teal-600 transition-colors">Trade Professional Support</Link></li>
                </ul>
              </div>

              {/* Social */}
              <div>
                <h3 className="font-semibold text-2xl mb-3">Social</h3>
                <ul className="text-xs space-y-2">
                  <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 transition-colors">Instagram</a></li>
                  <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 transition-colors">Twitter</a></li>
                  <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 transition-colors">Facebook</a></li>
                  <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-600 transition-colors">LinkedIn</a></li>
                </ul>
              </div>

              {/* Address */}
              <div>
                <h3 className="font-semibold text-2xl mb-3">Address</h3>
                <ul className="text-xs space-y-2">
                  <li>8101 Pearl Plaza, Unit 4G, Pearl Dr, Ortigas Center, Pasig, Metro Manila</li> 
                </ul>
              </div>
            </div>
            {/* Animated JK WORKS Logo */}
            <div className="mb-6">
              <div className="text-right w-full flex flex-col justify-end items-end">
                <div>
                  <div className="text-7xl font-extrabold leading-none">JK</div>
                  <div className="text-8xl font-extrabold tracking-wider flex items-center justify-end">
                    W
                    {/* Animated O logo */}
                    <div className="relative inline-flex items-center justify-center mx-2">
                      <div className="w-16 h-16 border-[6px] border-white rounded-full flex items-center justify-center">
                        <div 
                          className="w-10 h-10 border-[6px] border-white rounded-full"
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

        <hr className="border-white-500 my-6" />

        <div className="flex flex-col h-[2vh] md:flex-row justify-between items-center pt-4">
          <div className="text-xL text-white mb-3 md:mb-0">
            © {currentYear} JK WORKS
          </div>
          <div className="text-xL text-white mb-3 md:mb-0">
            Terms of Service
          </div>
          <button onClick={scrollToTop} className="text-xL text-black bg-white px-4 py-2 rounded hover:bg-gray-200 transition-colors">
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;