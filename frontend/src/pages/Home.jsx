import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import NavBar from "../components/Navbar"; 
import Project from "../components/Project";
import video from "../assets/try.mp4";
import FormPage from "../components/FormPage";
import Cservices from '../components/C_services';

const Home = () => {
  const projectRef = useRef(null);
  return (
    <div className="relative">
      <NavBar projectRef={projectRef} />
      <HeroSection />
      <div ref={projectRef}>
        <Project />
      </div> 
      <Cservices />
      <FormPage />
    </div>
  );
};

const HeroSection = ({ projectRef }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

      {/* Centered Content Container */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          >
            {/* Typewriter Text */}
            
            <div className="relative z-10">
              <p className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#c99e70] via-[#facc15] to-[#c99e70] leading-tight">
                {text}
                <Cursor 
                  cursorColor="#facc15" 
                  cursorStyle="|"
                  cursorBlinking={true}
                />
              </p>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl lg:text-2xl text-gray-300 mt-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Where creativity meets technology to build exceptional digital experiences
          </motion.p>

          {/* Decorative Elements */}
          <motion.div
            className="flex justify-center items-center mt-12 space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#c99e70]"></div>
            <div className="w-3 h-3 bg-[#facc15] rounded-full animate-pulse"></div>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#c99e70]"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Home;