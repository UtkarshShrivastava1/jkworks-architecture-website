import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import axios from 'axios';

function ProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 1.1]);
  const circleRotation = useTransform(scrollYProgress, [0.2, 0.3], [0, 360]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/projects/${projectId}`)
      .then(res => {
        setProject(res.data.project);
        setIsLoaded(true);
      })
      .catch(err => console.error(err));

    const interval = setInterval(() => {
      setRotationAngle(prev => (prev + 0.5) % 360);
    }, 50);

    return () => clearInterval(interval);
  }, [projectId]);

  const handleMouseMove = (e, id) => {
    const image = document.getElementById(`image-${id}`);
    const rect = image.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width - 0.5) * 15;
    const yPercent = (y / rect.height - 0.5) * 15;

    image.style.transform = `perspective(1000px) rotateX(${-yPercent / 3}deg) rotateY(${xPercent / 3}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = (id) => {
    const image = document.getElementById(`image-${id}`);
    image.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  if (!isLoaded || !project) return <div className="p-10 text-center">Loading...</div>;

  return (
    <motion.div
      ref={containerRef}
      className="min-h-screen bg-white text-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Hero Section */}
      <motion.div className="w-full h-[65vh] relative overflow-hidden" style={{ scale: heroScale }}>
        <motion.img
          src={project.heroImage}
          alt={project.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.2, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="px-8 py-6 bg-opacity-50"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl text-white font-bold tracking-tight">{project.title}</h1>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Info Section */}
      <motion.div className="flex flex-col md:flex-row w-full bg-[#2d2a2a] text-white h-[25vh]">
        <motion.div className="w-full md:w-[70%] p-8">
          <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
          <p className="text-lg">{project.description}</p>
        </motion.div>
        <motion.div className="w-full md:w-[30%] p-8">
          <p className="text-lg space-y-1">
            <span className="block">{project.location}</span>
            <span className="block">House area: {project.houseArea}</span>
            <span className="block">Lot area: {project.lotArea}</span>
          </p>
        </motion.div>
      </motion.div>

      {/* Industrial Design Section */}
      <motion.div className="min-h-screen bg-white flex flex-col md:flex-row">
        <motion.div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <motion.div
            className="mb-12 relative"
            style={{ rotate: circleRotation }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            {/* SVG Logo */}
            <svg width="180" height="180" viewBox="0 0 180 180" className="text-gray-800">
              {[80, 65, 50].map((r, i) => (
                <motion.circle
                  key={i}
                  cx="90"
                  cy="90"
                  r={r}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.2 + i * 0.2 }}
                />
              ))}
              {[["90", "10", "90", "25"], ["90", "155", "90", "170"], ["10", "90", "25", "90"], ["155", "90", "170", "90"]].map(
                ([x1, y1, x2, y2], i) => (
                  <motion.line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="currentColor"
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                  />
                )
              )}
              <motion.circle
                cx="90"
                cy="90"
                r="10"
                fill="currentColor"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              />
            </svg>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            {project.themeTitle}
          </h1>
        </motion.div>

        {/* Right: Gallery */}
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-4 p-4 md:p-16">
          {project.gallery.map((img, i) => (
            <motion.div
              key={i}
              id={`image-${i}`}
              className="overflow-hidden rounded-lg shadow-lg"
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <img
                src={img}
                alt={`Gallery ${i + 1}`}
                className="w-full h-48 object-cover"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProjectDetails;
