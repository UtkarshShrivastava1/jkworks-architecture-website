import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import NavBar from "../components/Navbar";
import Letstalk from "../components/Letstalk";
import Project from "../components/Project";
import video from "../assets/try.mp4";
import FormPage from "../components/FormPage";
import Cservices  from '../components/C_services';


const Home = () => {
  const projectRef = useRef(null);
  return (
    <div className="relative">
      <NavBar projectRef={projectRef}/>
      <HeroSection  />
      <div ref={projectRef}>
        <Project />
      </div>
      {/* <Letstalk /> */}
      <FormPage />
      <Cservices/>
    </div>
  );
};

const HeroSection = ({ projectRef }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Horizontal scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const sections = [
    { id: "01", title: "Digital Design", subtitle: "For all Disciplines" },
    { id: "02", title: "BIM Management", subtitle: "Quality & Efficiency" },
    { id: "03", title: "Implementation", subtitle: "Professional Services" },
    { id: "04", title: "Consulting", subtitle: "Complete Solutions" }
  ];

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(sections.length - 1) * 100}%`]
  );

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const newIndex = Math.min(
        Math.floor(latest * sections.length),
        sections.length - 1
      );
      setActiveIndex(newIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress, sections.length]);

  // Video autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(e => console.log('Autoplay prevented:', e));
    }
  }, []);

  // Typewriter effect
  const [text] = useTypewriter({
    words: ["Innovative Designs", "Quality Solutions", "Creative Excellence"],
    loop: true,
    typeSpeed: 50,
    deleteSpeed: 30
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[110vh] overflow-hidden bg-[#2d2a2a]/95"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#2d2a2a]/88 bg-opacity-5"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="h-[40vh] flex items-center justify-center px-4">
          <div className="text-center max-w-3xl">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* You can add a main heading here if needed */}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl lg:text-7xl text-[#c99e70]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {text}
              <Cursor cursorColor="#facc15" />
            </motion.p>
          </div>
        </div>

        {/* Horizontal Scroller */}
        <div className="h-[40vh] flex items-center pb-8">
          <motion.div
            className="flex items-center h-full"
            style={{ x }}
          >
            {sections.map((section) => (
              <div
                key={section.id}
                className="w-screen px-6 md:px-12 flex-shrink-0 opacity-100"
              >
                <div className="flex items-center max-w-4xl mx-auto">
                  <span className="text-2xl md:text-3xl text-[#c99e70] mr-6">
                    {section.id}
                  </span>
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-white">
                      {section.title}
                    </h2>
                    <p className="text-base text-gray-300 mt-1">
                      {section.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
            
    </section>
  );
};

export default Home;