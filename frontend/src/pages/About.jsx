import React, { useState, useEffect, useRef } from "react";
import bg1 from "../assets/bg1.jpg";
import bg2 from "../assets/bg2.jpg";
import bg3 from "../assets/bg3.jpg";
import officeInterior from "../assets/office-interior.jpg";
import intro from "../assets/intro.jpg"; 

const images = [
  `url(${bg1})`,
  `url(${bg2})`,
  `url(${bg3})`
];

const About = () => {
  const [bgImage, setBgImage] = useState(images[0]);
  const dividerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [key, setKey] = useState(0);
  const lastScrollY = useRef(0);
  const animationTimeoutRef = useRef(null);
  const isAnimatingRef = useRef(false);

  // Background image change effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBgImage((prevImage) => {
        const nextIndex = (images.indexOf(prevImage) + 1) % images.length;
        return images[nextIndex];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Optimized divider animation on scroll up and intersection
  useEffect(() => {
    const handleScroll = () => {
      // Prevent multiple rapid animations
      if (isAnimatingRef.current) return;
      
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY.current ? "down" : "up";
      lastScrollY.current = currentScrollY;

      if (direction === "up" && dividerRef.current) {
        const rect = dividerRef.current.getBoundingClientRect();
        const isInViewport =
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth);

        if (isInViewport && !isVisible) {
          // Clear any existing timeout
          if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
          }
          
          isAnimatingRef.current = true;
          setIsVisible(false);
          
          // Use requestAnimationFrame for smoother animation
          requestAnimationFrame(() => {
            animationTimeoutRef.current = setTimeout(() => {
              setIsVisible(true);
              setKey(prevKey => prevKey + 1);
              isAnimatingRef.current = false;
            }, 16); // Reduced from 50ms to 16ms (1 frame at 60fps)
          });
        }
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [isVisible]);

  // Intersection Observer for divider
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isVisible && !isAnimatingRef.current) {
          setIsVisible(true);
        } else if (!entry.isIntersecting && isVisible) {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 }
    );

    if (dividerRef.current) {
      observer.observe(dividerRef.current);
    }
    return () => {
      if (dividerRef.current) {
        observer.unobserve(dividerRef.current);
      }
    };
  }, [isVisible]);

  return (
    <>
      {/* Custom CSS for complex animations that can't be replicated with Tailwind */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .hero-text {
          animation: fadeInUp 1.5s ease-out forwards;
          background: linear-gradient(135deg, #ffffff, #f0f0f0, #ffffff);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 40px rgba(255, 255, 255, 0.3);
        }
        
        .hero-text.animated {
          animation: fadeInUp 1.5s ease-out forwards, gradientShift 6s ease-in-out infinite;
        }
        
        .card-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s ease;
        }
        
        .card-hover:hover::before {
          left: 100%;
        }
        
        .floating-element {
          animation: float 6s ease-in-out infinite;
        }
        
        .content-fade-in {
          animation: fadeInUp 1s ease-out forwards;
        }
        
        .content-slide-left {
          animation: slideInLeft 1s ease-out forwards;
        }
        
        .content-slide-right {
          animation: slideInRight 1s ease-out forwards;
        }
        
        .section-bg-pattern {
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a77744' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
        
        /* Optimized divider animations to prevent glitches */
        .divider-vertical {
          will-change: height;
          transform: translateZ(0);
        }
        
        .divider-horizontal {
          will-change: width;
          transform: translateZ(0);
        }
      `}</style>
      
      <div className="relative w-full flex flex-col text-white overflow-x-hidden">
        {/* Hero Section */}
        <div
          className="flex flex-col items-start justify-center h-screen w-full px-10 relative max-w-full transition-all duration-1000 bg-cover bg-center"
          style={{
            backgroundImage: bgImage,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/20"></div>
          <p className="text-6xl mt-2 max-w-xl text-white hero-text animated relative z-10">
            Design Beyond Boundaries.
          </p>
        </div>

        {/* Animated Divider */}
        <div
          ref={dividerRef}
          className="relative flex flex-col items-center z-10 mx-auto drop-shadow-lg"
          style={{
            marginTop: "-60px",
            marginBottom: "-40px",
            filter: "drop-shadow(0 0 8px rgba(139, 58, 58, 0.6))"
          }}
        >
          <div
            key={`vertical-${key}`}
            className="w-0.5 bg-[#8B3A3A] rounded-full divider-vertical"
            style={{
              height: isVisible ? "200px" : "0px",
              transition: "height 1.2s cubic-bezier(0.42, 0, 0.58, 1)",
              boxShadow: isVisible ? "0 0 16px #8B3A3A" : "none"
            }}
          />
          <div
            key={`horizontal-${key}`}
            className="bg-[#8B3A3A] rounded-full divider-horizontal"
            style={{
              width: isVisible ? "100px" : "0px",
              height: "0.5px",
              transition: "width 1.2s cubic-bezier(0.42, 0, 0.58, 1)",
              transitionDelay: "0.4s",
              boxShadow: isVisible ? "0 0 8px #8B3A3A" : "none"
            }}
          />
        </div>

        {/* Who We Are Section */}
        <div className="bg-gray-200 py-16 relative section-bg-pattern">
          <div className="max-w-7xl mx-auto px-8 md:px-24 relative z-10">
            <h2 className="text-3xl font-semibold text-[#a77744] uppercase mb-12 text-center relative content-fade-in mx-auto block">
              <span className="relative">
                WHO WE ARE
                {/* <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-15 h-0.5 bg-gradient-to-r from-[#a77744] to-yellow-600 rounded-full"></span> */}
              </span>
            </h2>
            <div className="flex flex-col md:flex-row gap-16">
              <div className="md:w-1/2 content-slide-left">
                <div className="relative overflow-hidden rounded-lg group">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-700/10 to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10"></div>
                  <img
                    src={officeInterior}
                    alt="Chevron Partners Office"
                    className="w-full h-auto rounded-md transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="md:w-1/2 text-gray-700 content-slide-right"> 
                <p className="mb-4 leading-relaxed text-lg">
                  At <span className="text-[#a77744] font-semibold">JK Works</span>, we are your premier partners in architecture and interior design, committed to transforming your vision into reality. With a passion for excellence and an eye for detail, we deliver bespoke design solutions that seamlessly blend aesthetics, functionality, and innovation.
                  <br/><br/> 
                  From conceptualization to completion, we offer comprehensive architectural and interior design services, backed by expert planning and construction management. Our multidisciplinary approach ensures that every project is thoughtfully crafted to reflect your unique needs while exceeding industry standards.
                  <br/><br/> 
                  Whether creating inspiring spaces for residential, commercial, or institutional projects, <span className="text-[#a77744] font-semibold">JK Works</span> is your trusted destination for design excellence and professional execution.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="bg-gray-50 py-16 relative section-bg-pattern">
          <div className="max-w-7xl mx-auto px-8 md:px-24 relative z-10">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Our Mission */}
              <div className="bg-white rounded-lg shadow-lg p-8 card-hover content-slide-left floating-element relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:shadow-amber-700/15" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-3xl font-bold text-[#a77744] mb-6">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed text-lg"> At <b>JK Works</b>, our mission is to craft timeless spaces that inspire and perform. We combine creative vision, functional design, and sustainable practices to transform ideas into exceptional environments. With a commitment to precision and excellence, we bring your aspirations to life—creating spaces where beauty meets purpose.
                </p>
              </div>

              {/* Our Vision */}
              <div className="bg-white rounded-lg shadow-lg p-8 card-hover content-slide-right floating-element relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:shadow-2xl hover:shadow-amber-700/15" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-3xl font-bold text-[#a77744] mb-6">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed text-lg"> To be a leading force in redefining spaces, where design innovation meets timeless elegance. We envision creating environments that not only inspire and uplift but also contribute meaningfully to a sustainable and better-built world. At <b>JK Works</b>, we aspire to set new benchmarks in architectural and interior design excellence, leaving a lasting impact on the communities we serve.
                </p>
              </div>
            </div>
          </div>
        </div> 

        {/* Meet the Founder Section */}
        <div className="max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8 mb-24">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-0">
            {/* Sidebar Content */}
            <div className="lg:w-2/5 px-2">
              <div className="pr-0 lg:pr-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#a77744] mb-6 lg:mb-8">Meet the Founder</h2>
                
                <div className="space-y-4 text-gray-700">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Jitendra Kumar</h3>
                    <p className="text-base sm:text-lg font-medium text-[#a77744] mb-1">Founder & Principal Architect, JK Works</p>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">M.Tech (Civil) with Specialization in Structural Engineering</p>
                  </div>
                  
                  <div className="space-y-4 text-sm sm:text-base leading-relaxed">
                    <p>
                      With over 7 years of hands-on experience in the field of architecture and interior design, 
                      Jitendra Kumar brings a wealth of expertise, creativity, and technical excellence to every 
                      project. An accomplished professional with an M.Tech in (Civil) with Specialization in 
                      Structural Engineering, he has successfully led the design and execution of 50+ diverse 
                      projects, spanning residential, commercial, and institutional spaces.
                    </p>
                    
                    <p>
                      Jitendra's design philosophy is rooted in creating spaces that are not only aesthetically inspiring 
                      but also highly functional and sustainable. His leadership at JK Works reflects a passion for 
                      innovation, thinking outside the box, and delivering outstanding client experiences. Known 
                      for his collaborative approach and attention to detail, Jitendra continues to drive JK Works 
                      towards setting new benchmarks in architectural excellence and interior innovation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Image Section */}
            <div className="lg:w-3/5 mt-6 lg:mt-0 px-2 flex items-center justify-center">
              <div className="w-full max-w-2xl">
                <img
                  src={intro}
                  alt="Jitendra Kumar - Founder of JK Works"
                  className="w-full h-auto max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;