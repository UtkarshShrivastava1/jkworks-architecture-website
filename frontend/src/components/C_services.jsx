import React, { useState } from 'react';
import { Palette, Calendar, Hammer, Users, ArrowRight } from 'lucide-react';

const ArchitectureServices = () => {
  const [activeCard, setActiveCard] = useState(null);

  const services = [
    {
      id: 1,
      title: "DESIGN",
      description: "We create innovative architectural solutions that blend aesthetics with functionality. Our design philosophy embraces sustainable practices, modern technology, and timeless elegance to deliver spaces that inspire and endure.",
      icon: <Palette className="w-6 h-6" />,
      bgImage: "/src/assets/design.jpg",
      color: "from-blue-600 to-purple-600",
      accentColor: "bg-blue-500"
    },
    {
      id: 2,
      title: "PLANNING",
      description: "Strategic planning forms the foundation of every successful project. We provide comprehensive planning services including feasibility studies, zoning analysis, permit coordination, and timeline development to ensure seamless project execution.",
      icon: <Calendar className="w-6 h-6" />,
      bgImage: "/src/assets/planning.jpg",
      color: "from-emerald-600 to-teal-600",
      accentColor: "bg-emerald-500"
    },
    {
      id: 3,
      title: "CONSTRUCTION",
      description: "Our construction management expertise ensures quality delivery within budget and schedule. We oversee all construction phases, coordinate with contractors, manage resources, and maintain the highest standards of craftsmanship and safety.",
      icon: <Hammer className="w-6 h-6" />,
      bgImage: "/src/assets/construction.jpg",
      color: "from-orange-600 to-red-600",
      accentColor: "bg-orange-500"
    },
    {
      id: 4,
      title: "MANAGEMENT",
      description: "End-to-end project management that transforms visions into reality. We coordinate all stakeholders, manage timelines and budgets, ensure compliance with regulations, and deliver exceptional results that exceed client expectations.",
      icon: <Users className="w-6 h-6" />,
      bgImage: "/src/assets/management.jpg",
      color: "from-slate-700 to-gray-900",
      accentColor: "bg-slate-600"
    }
  ];

  const handleCardInteraction = (serviceId) => {
    setActiveCard(activeCard === serviceId ? null : serviceId);
  };

  return (
    <div className="min-h-screen bg-gray-200 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute bottom-50 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full bg-gray-300 opacity-100 transform translate-x-8 translate-y-8 sm:translate-x-12 sm:translate-y-12 lg:translate-x-16 lg:translate-y-16"></div>
      <div className="absolute top-10 left-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-gray-300 opacity-100 transform -translate-x-4 -translate-y-4 sm:-translate-x-6 sm:-translate-y-6 lg:-translate-x-8 lg:-translate-y-8"></div>
      
      <div className="max-w-full mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20"> 
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            What we 
            <span className="bg-[#a77744]  bg-clip-text text-transparent"> Deliver?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl text-gray-700 font-light italic mx-auto leading-relaxed">
            "Comprehensive architectural services from concept to completion, delivering exceptional spaces that inspire and endure"
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#d59653] to-[#d07310] mx-auto mt-8 rounded-full"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-700 transform h-auto cursor-pointer
                ${activeCard === service.id ? 
                  'shadow-2xl -translate-y-2 scale-105' : 
                  'hover:shadow-2xl hover:-translate-y-2 hover:scale-105'
                }`}
              style={{
                animationDelay: `${index * 150}ms`
              }}
              onClick={() => handleCardInteraction(service.id)}
              onTouchStart={() => handleCardInteraction(service.id)}
            >
              {/* Full Background Image */}
              <img 
                src={service.bgImage}
                alt={service.title}
                className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 
                  ${activeCard === service.id ? 'scale-110' : 'group-hover:scale-110'}`}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              {/* Fallback gradient background */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${service.color} hidden`}
              ></div>
              
              {/* Dark Overlay for text readability */}
              <div className={`absolute inset-0 transition-all duration-500 
                ${activeCard === service.id ? 
                  'bg-black/30' : 
                  'bg-black/40 group-hover:bg-black/30'
                }`}></div>

              {/* Content Container - Flexible Height */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8 min-h-[400px] sm:min-h-[450px] lg:min-h-[500px]">
                {/* Service Title - Flexible to content */}
                <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-4 tracking-wide transition-colors duration-300 leading-tight 
                  ${activeCard === service.id ? 
                    'text-yellow-100' : 
                    'text-white group-hover:text-yellow-100'
                  }`}>
                  {service.title}
                </h3>

                {/* Description - Flexible height */}
                <p className={`leading-relaxed text-sm sm:text-base transition-all duration-300 
                  ${activeCard === service.id ? 
                    'text-white' : 
                    'text-white/90 group-hover:text-white'
                  }`}>
                  {service.description}
                </p>
              </div>

              {/* Premium Shine Effect */}
              <div className={`absolute inset-0 rounded-2xl transition-opacity duration-700 pointer-events-none 
                ${activeCard === service.id ? 
                  'opacity-100' : 
                  'opacity-0 group-hover:opacity-100'
                }`}>
                <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 transition-transform duration-1000 
                  ${activeCard === service.id ? 
                    'translate-x-[200%]' : 
                    'translate-x-[-200%] group-hover:translate-x-[200%]'
                  }`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "500+", label: "Projects Delivered" },
            { number: "15+", label: "Years of Excellence" },
            { number: "95%", label: "Client Retention" },
            { number: "25+", label: "Industry Awards" }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-gray-600 text-sm sm:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div> 
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @media (max-width: 640px) {
          .line-clamp-4 {
            -webkit-line-clamp: 3;
          }
        }
      `}</style>
    </div>
  );
};

export default ArchitectureServices;


 