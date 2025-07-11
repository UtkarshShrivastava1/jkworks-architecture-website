import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from '../assets/I_hero.jpg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import api, { API_URL } from "../services/api";

// import { API_URL } from "../services/api";

const Interior = () => {
  const [rotation, setRotation] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [projects, setProjects] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // References for scroll animations
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform values based on scroll
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const logoScale = useTransform(scrollYProgress, [0, 0.15], [0.8, 1]);

  useEffect(() => {
    // Fetch projects from backend
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API_URL}/projects/category/interior`);
        setProjects(Array.isArray(response.data) ? response.data : []);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
        setIsLoaded(true);
      }
    };

    // Initial page load animation
    setTimeout(() => fetchProjects(), 500);

    // Rotating logo animation
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Auto-rotate images in expanded card
  useEffect(() => {
    if (expandedIndex !== null && projects[expandedIndex]?.images?.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) =>
          prev === projects[expandedIndex].images.length - 1 ? 0 : prev + 1
        );
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [expandedIndex, projects]);

  // Helper for coverflow effect
  const getImageStyle = (idx, current, total) => {
    if (idx === current) {
      return {
        zIndex: 2,
        scale: 1.1,
        x: 0,
        filter: "brightness(1)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
      };
    }
    if (idx === (current - 1 + total) % total) {
      return {
        zIndex: 1,
        scale: 0.9,
        x: -120,
        filter: "brightness(0.7)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
      };
    }
    if (idx === (current + 1) % total) {
      return {
        zIndex: 1,
        scale: 0.9,
        x: 120,
        filter: "brightness(0.7)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
      };
    }
    // Hide other images
    return {
      zIndex: 0,
      scale: 0.7,
      x: idx < current ? -220 : 220,
      filter: "brightness(0.4)",
      opacity: 0,
      pointerEvents: "none"
    };
  };

  return (
    <motion.div 
      ref={containerRef}
      className="w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Hero Banner with Reveal Animation */}
      <motion.div 
        className="w-full h-screen bg-gray-200 relative overflow-hidden"
        initial={{ height: "100vh" }}
        animate={{ height: isLoaded ? "100vh" : "0vh" }}
        transition={{ duration: 1.2, ease: [0.6, 0.01, -0.05, 0.9] }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src={Hero}
            alt="Interior Design"
            className="w-full h-full object-cover"
          />
          <motion.div 
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </motion.div>
        
        {/* Floating text overlay */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="text-4xl xs:text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-center">
            INTERIOR<br/>EXCELLENCE
          </div>
        </motion.div>
      </motion.div>

      {/* Header Section with Scroll Animation */}
      <motion.div 
        style={{ opacity: headerOpacity }}
        className="w-full bg-gray-300 py-10 px-4 sm:py-16 sm:px-8 md:px-16 
             flex flex-row flex-wrap justify-between items-center gap-6 sticky top-0 z-30"
      >
        {/* Left Side: "HOMES WE'VE DESIGNED" */}
        <motion.div 
          className="text-left"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight leading-tight">
            HOMES WE'VE<br />DESIGNED
          </h1>
         
        </motion.div>

        {/* Right Side: JK WORKS Logo with Animation */}
        <motion.div 
          className="flex flex-col items-end min-w-[140px]"
          style={{ scale: logoScale }}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-3xl xs:text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter">JK</div>
          <div className="text-4xl xs:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter flex items-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >W</motion.span>
            {/* Enhanced Animated "O" */}
            <motion.div 
              className="relative inline-flex items-center justify-center mx-1"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-8 h-8 xs:w-10 xs:h-10 md:w-16 md:h-16 border-4 md:border-[6px] border-black rounded-full flex items-center justify-center">
                <motion.div
                  className="w-4 h-4 xs:w-6 xs:h-6 md:w-10 md:h-10 border-4 md:border-[6px] border-black rounded-full"
                  style={{ transform: `rotate(${rotation}deg)` }}
                  animate={{ 
                    boxShadow: ["0px 0px 0px rgba(0,0,0,0.2)", "0px 0px 15px rgba(0,0,0,0.2)", "0px 0px 0px rgba(0,0,0,0.2)"]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2 
                  }}
                ></motion.div>
              </div>
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >RKS</motion.span>
          </div>
        </motion.div>
      </motion.div>

{/*Project Grid with Expandable Card */}
<div className="max-w-7xl mx-auto py-8 px-2 sm:px-4 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 relative">
  {projects.map((project, index) => {
    if (expandedIndex === index) {
      const total = project.images?.length || 1;
      // Reset image index if out of bounds
      if (currentImageIndex >= total) setCurrentImageIndex(0);

      return (
        <motion.div
          key={project._id || index}
          className="col-span-1 xs:col-span-2 md:col-span-3 xl:col-span-4 bg-white rounded-2xl shadow-2xl flex flex-col items-center p-0 xs:p-0 mb-6 relative z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ gridColumn: "1 / -1" }}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-6 text-3xl text-gray-600 hover:text-black z-10"
            onClick={() => setExpandedIndex(null)}
            aria-label="Close"
          >
            &times;
          </button>
          {/* Coverflow Carousel */}
          <div className="w-full flex justify-center items-center bg-white pt-8 pb-4 transition-all duration-500 relative min-h-[340px]">
            {project.images && project.images.length > 0 && (
              <div className="relative flex items-center justify-center w-full max-w-5xl mx-auto overflow-hidden" style={{height: "340px"}}>
                {/* Left Arrow */}
                {project.images.length > 1 && (
                  <button
                    className="absolute left-2 z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                    onClick={e => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) =>
                        prev === 0 ? project.images.length - 1 : prev - 1
                      );
                    }}
                    aria-label="Previous image"
                  >
                    <span className="text-3xl font-bold">&#60;</span>
                  </button>
                )}
                {/* Images with coverflow effect */}
                <div className="relative w-full flex items-center justify-center overflow-visible" style={{height: "340px"}}>
                  {project.images.map((img, idx) => {
                    const total = project.images.length;
                    const isActive = idx === currentImageIndex;
                    const isPrev = idx === (currentImageIndex - 1 + total) % total;
                    const isNext = idx === (currentImageIndex + 1) % total;

                    let style = {
                      position: "absolute",
                      top: 0,
                      left: "50%",
                      height: "320px",
                      width: isActive ? "100%" : "60%",
                      boxShadow: isActive
                        ? "0 8px 32px rgba(0,0,0,0.25)"
                        : "0 2px 12px rgba(0,0,0,0.15)",
                      zIndex: isActive ? 3 : (isPrev || isNext ? 2 : 1),
                      opacity: isActive ? 1 : 0.7,
                      transition: "all 0.5s cubic-bezier(.4,2,.3,1)",
                      cursor: isActive ? "default" : "pointer",
                      filter: isActive ? "brightness(1)" : "brightness(0.7)",
                      transform: "",
                    };

                    if (isActive) {
                      style.transform = "translateX(-50%) scale(1.05)";
                    } else if (isPrev) {
                      style.transform = "translateX(-70%) scale(0.92) rotateY(-18deg)";
                    } else if (isNext) {
                      style.transform = "translateX(-30%) scale(0.92) rotateY(18deg)";
                    } else {
                      style.opacity = 0;
                      style.pointerEvents = "none";
                      style.transform = idx < currentImageIndex
                        ? "translateX(-200%) scale(0.7)"
                        : "translateX(100%) scale(0.7)";
                    }

                    return (
                      <motion.img
                        key={img}
                        src={`${API_URL.replace("/api", "")}/uploads/${img}`}
                        alt={project.title}
                        style={style}
                        onClick={e => {
                          if (!isActive) {
                            e.stopPropagation();
                            setCurrentImageIndex(idx);
                          }
                        }}
                      />
                    );
                  })}
                </div>
                {/* Right Arrow */}
                {project.images.length > 1 && (
                  <button
                    className="absolute right-2 z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                    onClick={e => {
                      e.stopPropagation();
                      setCurrentImageIndex((prev) =>
                        prev === project.images.length - 1 ? 0 : prev + 1
                      );
                    }}
                    aria-label="Next image"
                  >
                    <span className="text-3xl font-bold">&#62;</span>
                  </button>
                )}
              </div>
            )}
            {/* If no images */}
            {(!project.images || project.images.length === 0) && (
              <div className="text-gray-400">No images</div>
            )}
          </div>
          {/* Details and Actions below image */}
          <div className="w-full bg-[#f5f5f5] rounded-b-2xl flex flex-col px-6 py-8">
            <div className="font-bold text-lg md:text-xl mb-2 text-gray-900 leading-tight">
              {project.title}
            </div>
            <div className="text-base text-gray-600 mb-2">
              {project.category}
            </div>
            <div className="text-base text-gray-700 mb-2">
              {project.address}
            </div>
            <div className="text-base md:text-lg text-gray-800 whitespace-pre-line break-words mb-4">
              {project.description}
            </div>
            <div className="w-full">
              <div className="font-semibold text-lg text-gray-900 mb-3">Key Details</div>
              <div className="text-base text-gray-700 mb-2">
                <span className="font-medium">Carpet Area:</span>{" "}
                {project.carpetArea ? project.carpetArea : "-"}
              </div>
              <div className="text-base text-gray-700">
                <span className="font-medium">Construction Area:</span>{" "}
                {project.constructionArea ? project.constructionArea : "-"}
              </div>
            </div>
          </div>
        </motion.div>
      );

    }

    // Normal Card
    return (
      <motion.div 
        key={project._id || index} 
        className={`relative col-span-1 ${expandedIndex !== null ? 'opacity-50 hover:opacity-70' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: expandedIndex !== null ? 0.5 : 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => setExpandedIndex(index)}
      >
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group hover:shadow-2xl transition-all duration-300 cursor-pointer h-full">
          <div className="flex items-center justify-end px-4 pt-4">
            {project.isNew && (
              <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded font-semibold">
                New
              </span>
            )}
          </div>
          {/* Show first image only in card */}
          <img
            src={
              project.images && project.images.length > 0
              ? `${API_URL.replace("/api", "")}/uploads/${project.images[0]}`
                : ""
            }
            alt={project.title}
            className="w-full h-40 xs:h-48 object-cover rounded-tl-2xl rounded-tr-2xl"
          />
          <div className="px-4 xs:px-6 pb-4 xs:pb-6 flex-1 flex flex-col">
            <h3 className="font-bold text-base xs:text-lg mb-2 text-gray-900 leading-tight">
              {project.title}
            </h3>
            <p className="text-xs xs:text-sm text-gray-700 mb-2 line-clamp-2">
              {project.address}
            </p>
          </div>
        </div>
      </motion.div>
    );
  })}
</div>

      {/* Footer CTA Section */}
      <motion.div 
        className="w-full py-16 xs:py-24 px-4 xs:px-8 md:px-16 bg-gradient-to-r from-neutral-900 via-gray-800 to-black text-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-2xl xs:text-3xl md:text-5xl font-extrabold tracking-tight mb-4 xs:mb-6"
          initial={{ y: 40 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Ready to Elevate Your Living Space?
        </motion.h2>
        
        <motion.p 
          className="text-base xs:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-6 xs:mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Discover how JK WORKS blends design excellence with timeless functionality. Let's bring your dream interior to life.
        </motion.p>

        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link 
            to="/contact" 
            className="inline-block bg-white text-black px-6 xs:px-10 py-3 xs:py-4 text-base xs:text-lg font-semibold tracking-wide rounded-full transition-colors duration-300 hover:bg-yellow-400 hover:text-black shadow-md"
          >
            START YOUR PROJECT
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Interior;