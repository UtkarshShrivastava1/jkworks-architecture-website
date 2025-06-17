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

  // Divider animation on scroll up and intersection
  useEffect(() => {
    const handleScroll = () => {
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

        if (isInViewport) {
          setIsVisible(false);
          setTimeout(() => {
            setIsVisible(true);
            setKey(prevKey => prevKey + 1);
          }, 50);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for divider
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        } else if (!entries[0].isIntersecting) {
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
  }, []);

  return (
    <div className="relative w-full flex flex-col text-white overflow-x-hidden">
      {/* Hero Section */}
      <div
        className="flex flex-col items-start justify-center h-screen w-full px-10 relative max-w-full transition-all duration-1000"
        style={{
          backgroundImage: bgImage,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <h1 className="font-poppins">ABOUT CHEVRON PARTNERS</h1>
        <p className="text-6xl mt-2 max-w-xl text-white">
          Dedicated to quality real estate.
        </p>
      </div>

      {/* Animated Divider */}
      <div
        ref={dividerRef}
        className="relative flex flex-col items-center z-10 mx-auto"
        style={{
          marginTop: "-60px",
          marginBottom: "-40px"
        }}
      >
        <div
          key={`vertical-${key}`}
          className="w-0.5 bg-[#8B3A3A] rounded-full"
          style={{
            height: isVisible ? "200px" : "0px",
            transition: "height 1.2s cubic-bezier(0.42, 0, 0.58, 1)",
            boxShadow: isVisible ? "0 0 16px #8B3A3A" : "none"
          }}
        />
        <div
          key={`horizontal-${key}`}
          className="bg-[#8B3A3A] rounded-full"
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
      <div className="bg-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-8 md:px-24">
          <h2 className="text-2xl font-semibold text-[#333] uppercase mb-12 text-center">WHO WE ARE</h2>
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-1/2">
              <img
                src={officeInterior}
                alt="Chevron Partners Office"
                className="w-full h-auto rounded-md"
              />
            </div>
            <div className="md:w-1/2 text-[#333]">
              <p className="text-2xl font-light mb-6">
                Chevron Partners is a real estate firm that has developed some of the most charming boutique properties in the Boston area.
              </p>
              <p className="mb-4">
                With a close connection to our properties and passion for beautiful real estate, our collective market experience enables us to understand the diverse aspects of real estate development essential to an asset's performance.
              </p>
              <p className="mb-4">
                We understand the make-or-break links between the architect designing the space and the broker leasing the space, the importance of clear lease language, and the effects of local building codes on design options.
              </p>
              <p>
                Our team combines expertise in property development that blends architectural excellence with practical market knowledge, ensuring our projects not only look exceptional but perform well for our investors and partners.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar & Image Section */}
      <div className="max-w-7xl mx-auto mt-16 px-0">
        <div className="flex flex-col md:flex-row gap-0">
          <div className="md:w-2/5 pl-2">
            <div className="pr-2">
              <ul className="space-y-2 text-2xl font-serif ml-0 pl-2">
                <li><a href="#introduction" className="text-[#dfb51b] text-sm tracking-wide hover:text-[#333] transition-colors">INTRODUCTION</a></li>
                <li><a href="#investment" className="text-[#777] text-sm tracking-wide hover:text-[#333] transition-colors">INVESTMENT APPROACH & MANAGEMENT</a></li>
                <li><a href="#sourcing" className="text-[#777] text-sm tracking-wide hover:text-[#333] transition-colors">SOURCING & ANALYSIS</a></li>
                <li><a href="#permitting" className="text-[#777] text-sm tracking-wide hover:text-[#333] transition-colors">PERMITTING & LAND USE</a></li>
                <li><a href="#development" className="text-[#777] text-sm tracking-wide hover:text-[#333] transition-colors">DEVELOPMENT MANAGEMENT</a></li>
                <li><a href="#asset" className="text-[#777] text-sm tracking-wide hover:text-[#333] transition-colors">ASSET MANAGEMENT</a></li>
                <li><a href="#property" className="text-[#777] text-sm tracking-wide hover:text-[#333] transition-colors">PROPERTY MANAGEMENT</a></li>
                <li><a href="#architecture" className="text-[#777] text-sm tracking-wide hover:text-[#333] transition-colors">ARCHITECTURE & DESIGN</a></li>
                <li><a href="#brand" className="text-[#777] text-sm tracking-wide hover:text-[#333] transition-colors">BRAND STRATEGY & MARKETING</a></li>
                <li><a href="#materials" className="text-[#777] text-sm tracking-wide hover:text-[#333] transition-colors">IMPORTED QUALITY MATERIALS</a></li>
              </ul>
            </div>
          </div>
          <div className="md:w-3/5 mt-6 md:mt-0 pl-2 flex items-center">
            <img
              src={intro}
              alt="Property development workshop"
              className="w-full max-h-[600px] object-cover rounded-md shadow-lg"
              style={{ maxWidth: '800px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;