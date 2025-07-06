import React, { useState } from "react";
import { ChevronRight, Palette, Calendar, Hammer, Users } from "lucide-react";

// Import images at the top
import DesignImg from "../assets/design.jpg";
import PlanningImg from "../assets/planning.jpg";
import ConstructionImg from "../assets/construction.jpg";
import ManagementImg from "../assets/management.jpg";

const BMWProcessComponent = () => {
  const [activeCard, setActiveCard] = useState(null);
  const services = [
    {
      id: 1,
      title: "DESIGN",
      description:
        "We create innovative architectural solutions that blend aesthetics with functionality. Our design philosophy embraces sustainable practices, modern technology, and timeless elegance to deliver spaces that inspire and endure.",
      icon: <Palette className="w-6 h-6" />,
      bgImage: DesignImg,
      category: "Design Excellence",
    },
    {
      id: 2,
      title: "PLANNING",
      description:
        "Strategic planning forms the foundation of every successful project. We provide comprehensive planning services including feasibility studies, zoning analysis, permit coordination, and timeline development to ensure seamless project execution.",
      icon: <Calendar className="w-6 h-6" />,
      bgImage: PlanningImg,
      category: "Precision Planning",
    },
    {
      id: 3,
      title: "CONSTRUCTION",
      description:
        "Our construction management expertise ensures quality delivery within budget and schedule. We oversee all construction phases, coordinate with contractors, manage resources, and maintain the highest standards of craftsmanship and safety.",
      icon: <Hammer className="w-6 h-6" />,
      bgImage: ConstructionImg,
      category: "Quality Construction",
    },
    {
      id: 4,
      title: "MANAGEMENT",
      description:
        "End-to-end project management that transforms visions into reality. We coordinate all stakeholders, manage timelines and budgets, ensure compliance with regulations, and deliver exceptional results that exceed client expectations.",
      icon: <Users className="w-6 h-6" />,
      bgImage: ManagementImg,
      category: "Comprehensive Management",
    },
  ];

  return (
    <div className="bg-gray-200 min-h-screen p-6 lg:p-12 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute bottom-50 right-0 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-full bg-white/10 opacity-30 transform translate-x-8 translate-y-8 sm:translate-x-12 sm:translate-y-12 lg:translate-x-16 lg:translate-y-16"></div>
      <div className="absolute top-10 left-0 w-16 h-16 sm:w-24 sm:h-24 lg:w-32 lg:h-32 rounded-full bg-white/10 opacity-30 transform -translate-x-4 -translate-y-4 sm:-translate-x-6 sm:-translate-y-6 lg:-translate-x-8 lg:-translate-y-8"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6  text-[#a77744] ">
            What we
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#d59653] to-[#d07310]">
              {" "}
              Deliver
            </span>
          </h2>
          <p className="block mb-2 text-gray-700 font-light italic text-lg sm:text-xl md:text-2xl">
            "Comprehensive architectural services from concept to completion
            <br /> delivering exceptional spaces that inspire and endure"
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#d59653] to-[#d07310] mx-auto mt-8 rounded-full"></div>
        </div>

        {/* Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((item, index) => (
            <div
              key={item.id}
              className="group relative cursor-pointer"
              onMouseEnter={() => setActiveCard(item.id)}
              onMouseLeave={() => setActiveCard(null)}
              style={{
                animation: `slideInFromLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${
                  index * 0.15
                }s forwards`,
                opacity: 0,
                transform: "translateX(-120px)",
              }}
            >
              <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg -z-10"></div>
              <div className="h-full transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:-translate-x-3 group-hover:-translate-y-2">
                <div className="w-full h-[500px] bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg overflow-hidden shadow-lg transition-all duration-500 group-hover:shadow-xl relative">
                  <img
                    src={item.bgImage}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Premium Shine Effect */}
                  <div
                    className={`absolute inset-0 rounded-2xl transition-opacity duration-700 pointer-events-none 
                    ${
                      activeCard === item.id
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <div
                      className={`absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 transition-transform duration-1000 
                      ${
                        activeCard === item.id
                          ? "translate-x-[200%]"
                          : "translate-x-[-200%] group-hover:translate-x-[200%]"
                      }`}
                    ></div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 flex flex-col justify-end">
                    <h3 className="text-white font-bold text-xl leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-white/90 text-sm mt-3 line-clamp-13">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { number: "50+", label: "Projects Delivered" },
            { number: "7+", label: "Years of Excellence" },
            { number: "95%", label: "Client Retention" },
            // { number: "25+", label: "Industry Awards" },
            
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl sm:text-4xl font-bold  text-[#a77744] mb-2 group-hover:text-[#d59653] transition-colors duration-300">
                {stat.number}
              </div>
              <div className=" text-[#a77744] text-sm sm:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className=" text-[#a77744]">
              <h4 className="font-semibold mb-2">Design Philosophy</h4>
              <p className="text-sm">
                design language combines aesthetics with 
                efficiency
              </p>
            </div>
            <div className=" text-[#a77744]">
              <h4 className="font-semibold mb-2">Engineering Precision</h4>
              <p className="text-sm">
                Meticulous planning ensures performance and reliability
              </p>
            </div>
            <div className=" text-[#a77744]">
              <h4 className="font-semibold mb-2">Quality Assurance</h4>
              <p className="text-sm">
                Rigorous testing at every stage of production
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideInFromLeft {
          0% {
            opacity: 0;
            transform: translateX(-120px);
          }
          60% {
            opacity: 0.8;
            transform: translateX(10px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default BMWProcessComponent;
