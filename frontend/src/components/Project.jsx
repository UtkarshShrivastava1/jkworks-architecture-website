import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import InteriorImg from "../assets/interior_sec.jpg";
import ExteriorImg from "../assets/Exterior_sec.jpg";
import DesignImg from "../assets/design_sec.jpg";
const ProjectsShowcase = () => {
  // Sample project data (in a real implementation, this would come from props)
  const categories = [
    { 
      id: 1, 
      title: "Interior", 
      image: InteriorImg, 
      link: "/interior",
      description: "Transform your living spaces with our stunning interior design solutions."
    },
    { 
      id: 2, 
      title: "Exterior", 
      image: ExteriorImg, 
      link: "/exterior",
      description: "Create lasting impressions with our innovative exterior designs."
    },
    { 
      id: 3, 
      title: "Designs", 
      image: DesignImg, 
      link: "/designs",
      description: "Explore our creative concepts that blend aesthetics with functionality."
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <section className="relative w-full py-24 bg-gray-200 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-gray-300 opacity-100"></div>
      <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-gray-300 opacity-100"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#a77744]  mb-4">Our Projects</h2> 
          <p className="mt-6 text-xl text-gray-700 font-light italic max-w-2xl mx-auto">
            "Bringing your vision to life through innovative design and expert craftsmanship"
          </p>
                              <div className="w-24 h-1 bg-gradient-to-r from-[#d59653] to-[#d07310] mx-auto mt-8 rounded-full"></div>

        </div>
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main featured project display - closely matching your screenshot */}
          <div className="w-full lg:w-2/3">
            <div className="rounded-lg overflow-hidden shadow-lg bg-[#2d2a2a]">
              {/* Ensuring the image is actually displayed */}
              <div className="relative aspect-video">
                <img 
                  src={categories[activeIndex].image} 
                  alt={categories[activeIndex].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 text-white">
                <h3 className="text-3xl font-bold mb-2">{categories[activeIndex].title}</h3>
                <p className="text-gray-300 mb-6">{categories[activeIndex].description}</p>
                <a 
                  href={categories[activeIndex].link} 
                  className="inline-block px-6 py-3 bg-[#b39069] text-white rounded-md font-medium hover:bg-[#a3815d] transition-colors"
                >
                  Explore Projects
                </a>
              </div>
            </div>
          </div>

          {/* Project thumbnails - similar to your screenshot */}
          <div className="w-full lg:w-1/3 space-y-6">
            {categories.map((category, index) => (
              <div 
                key={category.id}
                onClick={() => setActiveIndex(index)}
                className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                  activeIndex === index 
                    ? 'bg-[#e9e6e0]' 
                    : 'bg-white hover:bg-gray-100'
                }`}
              >
                <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 mr-4">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-lg text-[#2d2a2a]">{category.title}</h4>
                  <p className="text-gray-600 text-sm">{category.description.split('.')[0]}.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation dots - matching your screenshot */}
        <div className="flex justify-center mt-8 gap-2">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                activeIndex === index 
                  ? 'bg-[#b39069]' 
                  : 'bg-[#2d2a2a]'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;

