import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getProjectsByCategory } from '../services/projectService';
import { Link } from 'react-router-dom';
import Hero from '../assets/I_hero.jpg';

const API_URL = import.meta.env.VITE_DEVELOPMENT_URL || 'http://localhost:5000';

const Exterior = () => {
  const [rotation, setRotation] = useState(0);
  const [activeProject, setActiveProject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setTimeout(() => setIsLoaded(true), 500);
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const data = await getProjectsByCategory('exterior');
        setProjects(data);
      } catch (err) {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Mouse parallax effect for project images
  const handleMouseMove = (e, id) => {
    if (activeProject === id) {
      const card = document.getElementById(`project-${id}`);
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xPercent = (x / rect.width - 0.5) * 10;
      const yPercent = (y / rect.height - 0.5) * 10;
      card.style.transform = `perspective(1000px) rotateX(${-yPercent}deg) rotateY(${xPercent}deg) scale3d(1.02, 1.02, 1.02)`;
    }
  };

  const handleMouseLeave = (id) => {
    const card = document.getElementById(`project-${id}`);
    if (card) card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
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
        {/* You can use a static hero image or a default one */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <img
            src={Hero}
            alt="Exterior Design"
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
            EXTERIOR<br/>EXCELLENCE
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
            HOMES WE'VE<br />DESIGNED
          </h1>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/v" className="inline-block mt-6 bg-black text-white px-8 py-3 font-medium transition-all duration-300 hover:bg-gray-800">
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
          <div className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter">JK</div>
          <div className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter flex items-center">
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
              <div className="w-16 h-16 md:w-20 md:h-20 border-4 md:border-[6px] border-black rounded-full flex items-center justify-center">
                <motion.div
                  className="w-10 h-10 md:w-12 md:h-12 border-4 md:border-[6px] border-black rounded-full"
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

      {/* Project Sections */}
      {loading ? (
        <div className="text-center text-gray-500 py-12">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="text-center text-gray-500 py-12">No exterior projects found.</div>
      ) : (
        projects.map((project, index) => (
          <div key={project._id || index} className="relative">
            {/* Project Image */}
            <motion.div 
              className="w-full h-[80vh] overflow-hidden cursor-pointer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              onMouseEnter={() => setActiveProject(project._id)}
              onMouseLeave={() => {
                setActiveProject(null);
                handleMouseLeave(project._id);
              }}
              onMouseMove={(e) => handleMouseMove(e, project._id)}
              id={`project-${project._id}`}
            >
              <motion.img
                src={`${API_URL}/uploads/${project.image}`}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>

            {/* Card-like section below the image */}
            <div className="w-full bg-[#e3e3e3] flex flex-col md:flex-row items-stretch px-8 py-12 md:py-16 md:px-16 gap-8">
              {/* Title on the left */}
              <div className="flex-1 flex items-center">
                <div className="text-4xl font-bold text-black">{project.title}</div>
              </div>
              {/* Description in the center */}
              <div className="flex-1 flex items-center">
                <div
                  className="text-lg md:text-xl text-black leading-relaxed whitespace-pre-line break-words"
                  style={{ wordBreak: "break-word" }}
                >
                  {project.description}
                </div>
              </div>
              {/* Button on the right */}
              <div className="flex-1 flex items-center justify-end">
                <Link
                  to={`/project/${project.slug}`}
                  className="inline-block bg-black text-white px-10 py-4 text-lg font-semibold tracking-wide rounded-none transition-all duration-300 hover:bg-gray-800 hover:shadow-lg"
                >
                  VIEW PROJECT
                </Link>
              </div>
            </div>

            {/* Animated separator line */}
            {index < projects.length - 1 && (
              <motion.div 
                className="w-0 h-[1px] bg-gray-400 mx-auto"
                initial={{ width: "0%" }}
                whileInView={{ width: "80%" }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              />
            )}
          </div>
        ))
      )}

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
          Discover how JK WORKS blends design excellence with timeless functionality. Let’s bring your dream interior to life.
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

export default Exterior;