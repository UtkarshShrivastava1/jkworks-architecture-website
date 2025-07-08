import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import axios from "axios";
import { Link } from "react-router-dom";
import Hero from "../assets/I_hero.jpg";
import { API_URL } from "../services/api";

const Design = () => {
  const [rotation, setRotation] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [projects, setProjects] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // References for scroll animations
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform values based on scroll
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const logoScale = useTransform(scrollYProgress, [0, 0.15], [0.8, 1]);

  useEffect(() => {
    // Fetch projects from backend
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/projects/category/design`
        );
        setProjects(Array.isArray(response.data) ? response.data : []);
        setIsLoaded(true);
      } catch (error) {
        setProjects([]);
        setIsLoaded(true);
      }
    };

    setTimeout(() => fetchProjects(), 500);

    // Rotating logo animation
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
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
      pointerEvents: "none",
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
            alt="Design Hero"
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
          <div className="text-6xl md:text-8xl font-bold tracking-tighter text-center">
            DESIGN
            <br />
            EXCELLENCE
          </div>
        </motion.div>
      </motion.div>

      {/* Header Section with Scroll Animation */}
      <motion.div
        style={{ opacity: headerOpacity }}
        className="w-full bg-gray-300 py-16 px-8 md:px-16 flex flex-col md:flex-row justify-between items-start md:items-center sticky top-0 z-30"
      >
        {/* Left Side: "HOMES WE'VE DESIGNED" */}
        <motion.div
          className="mb-10 md:mb-0"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight leading-none">
            HOMES WE'VE
            <br />
            DESIGNED
          </h1>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/v"
              className="inline-block mt-6 bg-black text-white px-8 py-3 font-medium transition-all duration-300 hover:bg-gray-800 rounded"
            >
              VIEW PROJECTS
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side: JK WORKS Logo with Animation */}
        <motion.div
          className="flex flex-col items-end ml-8"
          style={{ scale: logoScale }}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter">
            JK
          </div>
          <div className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter flex items-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              W
            </motion.span>
            {/* Enhanced Animated "O" */}
            <motion.div
              className="relative inline-flex items-center justify-center mx-1"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 border-4 md:border-[6px] border-black rounded-full flex items-center justify-center">
                <motion.div
                  className="w-10 h-10 md:w-12 md:h-12 border-4 md:border-[6px] border-black rounded-full"
                  style={{ transform: `rotate(${rotation}deg)` }}
                  animate={{
                    boxShadow: [
                      "0px 0px 0px rgba(0,0,0,0.2)",
                      "0px 0px 15px rgba(0,0,0,0.2)",
                      "0px 0px 0px rgba(0,0,0,0.2)",
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                  }}
                ></motion.div>
              </div>
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              RKS
            </motion.span>
          </div>
        </motion.div>
      </motion.div>

      {/* Project Grid with Expandable Card */}
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
                    <div
                      className="relative flex items-center justify-center w-full max-w-5xl mx-auto overflow-hidden"
                      style={{ height: "340px" }}
                    >
                      {/* Left Arrow */}
                      {project.images.length > 1 && (
                        <button
                          className="absolute left-2 z-30 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
                          onClick={(e) => {
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
                      <div
                        className="relative w-full flex items-center justify-center overflow-hidden"
                        style={{ height: "340px" }}
                      >
                        {project.images.map((img, idx) => {
                          const total = project.images.length;
                          const style = getImageStyle(
                            idx,
                            currentImageIndex,
                            total
                          );
                          return (
                            <motion.img
                              key={img}
                              src={`${API_URL.replace(
                                "/api",
                                ""
                              )}/uploads/${img}`}
                              alt={project.title}
                              style={{
                                position: "absolute",
                                top: 0,
                                left: "50%",
                                height: "320px",
                                width: style.scale === 1.1 ? "100%" : "60%",
                                boxShadow: style.boxShadow,
                                zIndex: style.zIndex,
                                opacity:
                                  style.opacity !== undefined
                                    ? style.opacity
                                    : 1,
                                transition: "all 0.5s cubic-bezier(.4,2,.3,1)",
                                cursor:
                                  style.scale === 1.1 ? "default" : "pointer",
                                filter: style.filter,
                                transform: `translateX(-50%) scale(${
                                  style.scale
                                }) translateX(${style.x || 0}px)`,
                                pointerEvents: style.pointerEvents,
                              }}
                              onClick={(e) => {
                                if (style.scale !== 1.1) {
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
                          onClick={(e) => {
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
                    <div className="font-semibold text-lg text-gray-900 mb-3">
                      Key Details
                    </div>
                    <div className="text-base text-gray-700 mb-2">
                      <span className="font-medium">Carpet Area:</span>{" "}
                      {project.carpetArea ? project.carpetArea : "-"}
                    </div>
                    <div className="text-base text-gray-700">
                      <span className="font-medium">Construction Area:</span>{" "}
                      {project.constructionArea
                        ? project.constructionArea
                        : "-"}
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
              className={`relative col-span-1 ${
                expandedIndex !== null ? "opacity-50 hover:opacity-70" : ""
              }`}
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
                      ? `${API_URL.replace("/api", "")}/uploads/${
                          project.images[0]
                        }`
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
        className="w-full py-24 px-8 md:px-16 bg-gradient-to-r from-neutral-900 via-gray-800 to-black text-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6"
          initial={{ y: 40 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Ready to Elevate Your Living Space?
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Discover how JK WORKS blends design excellence with timeless
          functionality. Let’s bring your dream interior to life.
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link
            to="/contact"
            className="inline-block bg-white text-black px-10 py-4 text-lg font-semibold tracking-wide rounded-full transition-colors duration-300 hover:bg-yellow-400 hover:text-black shadow-md"
          >
            START YOUR PROJECT
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Design;
