import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import axios from 'axios';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

function ProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Embla setup
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center', containScroll: 'trimSnaps' }, // key change here!
    [Autoplay({ delay: 3000 })]
  );
  const [slideIndexes, setSlideIndexes] = useState([]);

  // Track selected slide for coverflow effect
  const [selectedSlide, setSelectedSlide] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/projects/${projectId}`)
      .then(res => {
        setProject(res.data.project);
        setIsLoaded(true);
      })
      .catch(err => console.error(err));
  }, [projectId]);

  useEffect(() => {
    if (emblaApi) {
      setSlideIndexes(emblaApi.scrollSnapList());
      emblaApi.on('select', () => {
        setSelectedSlide(emblaApi.selectedScrollSnap());
      });
      setSelectedSlide(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi]);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  if (!isLoaded || !project) return <div className="p-10 text-center">Loading...</div>;

  return (
    <motion.div className="min-h-screen bg-white text-black overflow-hidden">
      {/* Hero Section */}
      <motion.div className="w-full h-[65vh] relative overflow-hidden">
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

        {/* Coverflow Carousel */}
        <div className="w-full md:w-1/2 p-8 md:p-16">
          <div className="relative">
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow p-2 hover:bg-white"
              aria-label="Previous"
              style={{ left: '-2rem' }}
            >
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 28L8 16l12-12"/></svg>
            </button>
            <div className="overflow-x-visible flex justify-center" style={{ minHeight: 240 }}>
              <div
                className="overflow-hidden"
                style={{ width: 700, maxWidth: '100%' }}
                ref={emblaRef}
              >
                <div className="flex items-center">
                  {project.gallery.map((img, index) => {
                    // Calculate position relative to center
                    const diff = index - selectedSlide;
                    const total = project.gallery.length;
                    let pos = diff;
                    if (diff > total / 2) pos -= total;
                    if (diff < -total / 2) pos += total;

                    // Style for coverflow
                    let scale = 0.7;
                    let opacity = 0.5;
                    let rotate = 0;
                    let zIndex = 1;
                    if (pos === 0) {
                      scale = 1.1;
                      opacity = 1;
                      zIndex = 10;
                    } else if (Math.abs(pos) === 1) {
                      scale = 0.85;
                      opacity = 0.7;
                      rotate = pos * 12;
                      zIndex = 5;
                    } else {
                      scale = 0.7;
                      opacity = 0.4;
                      rotate = pos * 18;
                      zIndex = 1;
                    }

                    return (
                      <div
                        key={index}
                        className="flex-shrink-0 w-[220px] h-[220px] mx-2 rounded-xl overflow-hidden shadow-xl transition-transform duration-500 ease-in-out cursor-pointer"
                        style={{
                          transform: `scale(${scale}) rotateY(${rotate}deg)`,
                          opacity,
                          zIndex,
                          transition: 'transform 0.5s, opacity 0.5s, z-index 0.5s'
                        }}
                        onClick={() => {
                          setSelectedIndex(index);
                          setLightboxOpen(true);
                        }}
                      >
                        <img
                          src={img}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full shadow p-2 hover:bg-white"
              aria-label="Next"
              style={{ right: '-2rem' }}
            >
              <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4l12 12-12 12"/></svg>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Lightbox Viewer */}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={selectedIndex}
          slides={project.gallery.map((img) => ({ src: img }))}
        />
      )}
    </motion.div>
  );
}

export default ProjectDetails;
