// import React from "react";
// import { Link } from "react-router-dom";
// import jkLogo from "../assets/jk_logo.png";

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <footer className="bg-[#2d2a2a] text-white w-full transition-opacity duration-700">
//       <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl"> {/* Reduced py-8 to py-6 */}
//         <div className="flex flex-col lg:flex-row justify-between items-start pb-6"> {/* Reduced pb-8 to pb-6 */}
          
//           {/* DIV 1: Company Logo */}
//           <div className="mb-6 lg:mb-0 w-full lg:w-2/5"> 
//             <img
//               src={jkLogo}
//               alt="JK Works Logo"
//               className="h-auto w-full max-w-xs md:max-w-sm"
//             />
//             <p className="text-lg sm:text-xl md:text-2xl text-white mt-3 max-w-xs md:max-w-sm">
//               Custom solutions for your unique space with JK WORKS
//             </p>
//           </div>

//           {/* DIV 2: Content - Grid with reduced spacing */}
//           <div className="w-full text-white lg:w-3/5">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"> {/* Reduced gap-6 sm:gap-8 to gap-4 sm:gap-6 */}
              
//               {/* About Us */}
//               <div>
//                 <h3 className="font-semibold text-xl sm:text-2xl mb-2"> {/* Reduced mb-3 to mb-2 */}
//                   About Us
//                 </h3>
//                 <ul className="text-xs sm:text-sm space-y-1"> {/* Reduced space-y-2 to space-y-1 */}
//                   <li>
//                     <Link
//                       to="/interior"
//                       className="hover:text-teal-600 transition-colors"
//                     >
//                       Interior
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/exterior"
//                       className="hover:text-teal-600 transition-colors"
//                     >
//                       Exterior
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/designs"
//                       className="hover:text-teal-600 transition-colors"
//                     >
//                       Design
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/mycourses"
//                       className="hover:text-teal-600 transition-colors"
//                     >
//                       My Courses
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/login"
//                       className="hover:text-teal-600 transition-colors"
//                       onClick={() =>
//                         window.scrollTo({ top: 0, behavior: "smooth" })
//                       }
//                     >
//                       Admin
//                     </Link>
//                   </li>
//                 </ul>
//               </div>

//               {/* Support */}
//               <div>
//                 <h3 className="font-semibold text-xl sm:text-2xl mb-2">
//                   Support
//                 </h3>
//                 <ul className="text-xs sm:text-sm space-y-1">
//                   <li>
//                     <Link
//                       to="/contact"
//                       className="hover:text-teal-600 transition-colors"
//                     >
//                       Contact us
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/faqs"
//                       className="hover:text-teal-600 transition-colors"
//                     >
//                       FAQ's
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/care-guide"
//                       className="hover:text-teal-600 transition-colors"
//                     >
//                       Material Care Guide
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to="/trade-support"
//                       className="hover:text-teal-600 transition-colors"
//                     >
//                       Trade Professional Support
//                     </Link>
//                   </li>
//                 </ul>
//               </div>

//               {/* Social */}
//               <div>
//                 <h3 className="font-semibold text-xl sm:text-2xl mb-2">
//                   Social
//                 </h3>
//                 <ul className="text-xs sm:text-sm space-y-1">
//                   <li>
//                     <a
//                       href="https://www.instagram.com/j_k_works_?igsh=MWpkYzBudm12NjBudQ=="
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="hover:text-teal-600 transition-colors"
//                     >
//                       Instagram
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="https://twitter.com"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="hover:text-teal-600 transition-colors"
//                     >
//                       Twitter
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="https://facebook.com"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="hover:text-teal-600 transition-colors"
//                     >
//                       Facebook
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="https://linkedin.com"
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="hover:text-teal-600 transition-colors"
//                     >
//                       LinkedIn
//                     </a>
//                   </li>
//                 </ul>
//               </div>

//               {/* Address */}
//               <div>
//                 <h3 className="font-semibold text-xl sm:text-2xl mb-2">
//                   Address
//                 </h3>
//                 <div className="text-xs sm:text-sm">
//                   <p className="leading-4"> {/* Added tighter line height */}
//                     Quarter No. 21/b<br />
//                     Street No. 16 Sector-2<br />
//                     Bhilai, Durg
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Responsive PNG Logo with reduced top margin */}
//             <div className="mt-3 sm:mt-4 md:mt-6"> {/* Reduced mt-4 sm:mt-6 md:mt-8 lg:mt-12 */}
//               <div className="text-right w-full flex flex-col justify-end items-end">
//                 <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
//                   <img 
//                     src="/JK.png" 
//                     alt="JK WORKS Logo" 
//                     className="w-full h-auto object-contain ml-auto block"
//                     style={{ 
//                       maxWidth: '100%',
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <hr className="border-white-500 my-3 sm:my-4" /> {/* Reduced my-4 sm:my-6 to my-3 sm:my-4 */}

//         <div className="flex flex-col sm:flex-row justify-between items-center pt-3 space-y-2 sm:space-y-0"> {/* Reduced pt-4 and space-y-3 */}
//           <div className="text-sm sm:text-base text-white">
//             Copyright © {currentYear} All rights reserved By JK WORKS
//           </div>
//           <div className="text-sm sm:text-base text-white">  
//             Powered By <a href="https://www.zager.in/homepage" className="text-blue-300 hover:underline">Zager Digital Services</a>
//           </div>
//           <button
//             onClick={scrollToTop}
//             className="text-sm sm:text-base text-black bg-white px-3 py-1 sm:px-4 sm:py-2 rounded hover:bg-gray-200 transition-colors"
//           >
//             Back to Top
//           </button>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-[#2d2a2a] text-white transition-opacity duration-700">
      <div className="mx-auto px-4 sm:px-5 lg:px-6 py-8 sm:py-12 lg:py-16 max-w-7xl">
        {/* Main Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 items-start gap-2 sm:gap-3 lg:gap-4">
          
          {/* About Us */}
          <div className="space-y-1 sm:space-y-1">
            <h3 className="font-semibold text-xs lg:text-2xl sm:text-sm mb-1 text-white">About Us</h3>
            <ul className="text-[0.6rem] sm:text-[0.9rem] space-y-0.5">
              <li><Link to="/interior" className="hover:text-teal-400 block py-0.5">Interior</Link></li>
              <li><Link to="/exterior" className="hover:text-teal-400 block py-0.5">Exterior</Link></li>
              <li><Link to="/designs" className="hover:text-teal-400 block py-0.5">Design</Link></li>
              <li><Link to="/mycourses" className="hover:text-teal-400 block py-0.5">My Courses</Link></li>
              <li><Link to="/login" className="hover:text-teal-400 block py-0.5" onClick={scrollToTop}>Admin</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-1 sm:space-y-1">
            <h3 className="font-semibold text-xs lg:text-2xl sm:text-sm mb-1 text-white">Support</h3>
            <ul className="text-[0.6rem] sm:text-[0.9rem] space-y-0.5">
              <li><Link to="/contact" className="hover:text-teal-400 block py-0.5">Contact us</Link></li>
              <li><Link to="/faqs" className="hover:text-teal-400 block py-0.5">FAQ's</Link></li>
              <li><Link to="/care-guide" className="hover:text-teal-400 block py-0.5">Material Care Guide</Link></li>
              <li><Link to="/trade-support" className="hover:text-teal-400 block py-0.5">Trade Professional Support</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-1 sm:space-y-1">
            <h3 className="font-semibold text-xs lg:text-2xl sm:text-sm mb-1 text-white">Social</h3>
            <ul className="text-[0.6rem] sm:text-[0.9rem] space-y-0.5">
              <li><a href="https://www.instagram.com/j_k_works_?igsh=MWpkYzBudm12NjBudQ==" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 block py-0.5">Instagram</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 block py-0.5">Twitter</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 block py-0.5">Facebook</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 block py-0.5">LinkedIn</a></li>
            </ul>
          </div>

          {/* Logo - spans two columns for maximum size */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end items-start pt-2">
            <img 
              src="/JK.png" 
              alt="JK WORKS Logo" 
              className="w-full max-w-[48rem] h-auto object-contain"
            />
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-500 my-6 sm:my-8 lg:my-10" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 sm:pt-5 space-y-4 sm:space-y-0">
          <div className="text-sm sm:text-base lg:text-lg text-white text-center sm:text-left">
            Copyright © {currentYear} All rights reserved By JK WORKS
          </div>
          <div className="text-sm sm:text-base lg:text-lg text-white text-center sm:text-left order-last sm:order-none">  
            Powered By{" "}
            <a href="https://www.zager.in/homepage" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors duration-300">
              Zager Digital Services
            </a>
          </div>
          <button
            onClick={scrollToTop}
            className="text-sm sm:text-base lg:text-lg text-black bg-white px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 rounded-lg hover:bg-gray-200 duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform"
          >
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


